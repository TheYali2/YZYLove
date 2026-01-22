import React, { useEffect, useState } from 'react';
import { YeItem } from '../types';
import { XIcon } from './Icons';

interface ItemModalProps {
    item: YeItem | null;
    onClose: () => void;
}

const BULLY_TARGET_DATE = "2026-01-30T00:00:00";

const Countdown = ({ onComplete }: { onComplete: () => void }) => {
    const calculateTimeLeft = () => {
        const targetDate = new Date(BULLY_TARGET_DATE).getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return null;
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const left = calculateTimeLeft();
            if (!left) {
                onComplete();
                clearInterval(timer);
            }
            setTimeLeft(left);
        }, 1000);
        return () => clearInterval(timer);
    }, [onComplete]);

    if (!timeLeft) return null;

    return (
        <div className="mt-2 text-red-600 font-mono text-xs md:text-sm uppercase tracking-widest animate-pulse">
            RELEASE IN: {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}S
        </div>
    );
};

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [visible, setVisible] = useState(false);
    const [songLabel, setSongLabel] = useState("");
    const [isBullyReleased, setIsBullyReleased] = useState(false);

    useEffect(() => {
        if (item) {
            setVisible(true);
            setIsClosing(false);
            setSongLabel(item.best_song || "");

            if (item.code === 'BULLY') {
                const target = new Date(BULLY_TARGET_DATE).getTime();
                const now = new Date().getTime();
                setIsBullyReleased(now >= target);
            } else {
                setIsBullyReleased(false);
            }
        }
    }, [item]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setVisible(false);
            onClose();
        }, 300);
    };

    const handleActionClick = () => {
        if (item?.disableDownload) return;

        if (item?.code === 'BULLY' && isBullyReleased) {
            window.open('https://open.spotify.com/prerelease/4xFs0x8abwU3H9uNRPFRmE', '_blank');
            return;
        }

        if (item?.downloadUrl) {
            window.open(item.downloadUrl, '_blank');
        } else if (item?.albumUrl) {
            window.open(item.albumUrl, '_blank');
        }
    };

    const handleSongClick = () => {
        if (item?.type === 'UNRELEASED' || item?.best_song === 'Unknown') {
            setSongLabel("UNRELEASED");
        }
    };

    if (!item && !visible) return null;

    const isDisabled = item?.disableDownload === true;

    let buttonText = "PLAY";
    if (item?.downloadUrl) {
        buttonText = "DOWNLOAD ALBUM";
    }

    if (item?.code === 'GAJ' || item?.code === 'YNDH' || item?.code === 'CS') {
        buttonText = "PLAY";
    }

    if (item?.code === 'BULLY' && isBullyReleased) {
        buttonText = "PLAY";
    }

    const buttonStyle = isDisabled
        ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
        : "bg-black text-white hover:bg-gray-800";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className={`absolute inset-0 bg-white/80 backdrop-blur-md cursor-pointer ${isClosing ? 'animate-blur-out' : 'animate-blur-in'}`}
                onClick={handleClose}
            ></div>

            <div className={`relative w-full max-w-2xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100 ${isClosing ? 'animate-blur-out' : 'animate-fade-in'}`}>
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 hover:opacity-50 transition-opacity"
                >
                    <XIcon />
                </button>

                <div className="w-full md:w-1/2 aspect-square bg-gray-50 flex items-center justify-center p-0">
                    <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover mix-blend-multiply"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center gap-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-2">{item?.name}</h2>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">{item?.year}</p>
                        {item?.artist && <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">{item.artist}</p>}

                        {item?.code === 'BULLY' && !isBullyReleased && (
                            <Countdown onComplete={() => setIsBullyReleased(true)} />
                        )}
                    </div>

                    {item?.best_song && (
                        <div className="border-t border-gray-100 pt-4">
                            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block mb-1">Popular Track from album</span>
                            <div className="flex justify-between items-end">
                                <span
                                    onClick={handleSongClick}
                                    className={`text-sm font-medium uppercase tracking-tight select-none ${(item?.type === 'UNRELEASED' || item?.best_song === 'Unknown') ? 'cursor-pointer hover:opacity-50 transition-opacity' : ''}`}
                                >
                                    {songLabel}
                                </span>
                                {item.streamCount && (
                                    <span className="text-[10px] text-gray-400 font-mono">{item.streamCount} Streams</span>
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        disabled={isDisabled}
                        onClick={handleActionClick}
                        className={`w-full py-3 uppercase text-sm transition-colors ${buttonStyle}`}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};
