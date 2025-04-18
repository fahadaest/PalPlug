'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Doc from '@/assets/images/doc.svg';
import Pen from '@/assets/images/Pen.svg';
import { useDispatch } from 'react-redux';
import { setResumeUploaded } from '@/app/redux/slice/user/userSlice';

const Resume = ({ isOpen, onClose, onSave, initialData = {} }) => {
    const [fileName, setFileName] = useState(initialData.fileName || '');
    const [fileSize, setFileSize] = useState(initialData.fileSize || '');
    const [linkedInUrl, setLinkedInUrl] = useState(initialData.linkedInUrl || '');
    const [portfolioLink, setPortfolioLink] = useState(initialData.portfolioLink || '');
    const dispatch = useDispatch();

    useEffect(() => {
        setFileName(initialData.fileName || '');
        setFileSize(initialData.fileSize || '');
        setLinkedInUrl(initialData.linkedInUrl || '');
        setPortfolioLink(initialData.portfolioLink || '');
    }, [initialData]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const maxSize = 5 * 1024 * 1024;

        if (file) {
            if (file.type !== 'application/pdf') {
                alert('Please upload a PDF file only');
                event.target.value = '';
                return;
            }

            if (file.size > maxSize) {
                alert('File size should not exceed 5MB');
                event.target.value = '';
                return;
            }

            setFileName(file.name);
            setFileSize((file.size / 1024 / 1024).toFixed(1) + ' mb');
        }
    };

    const triggerFileInput = () => {
        document.getElementById('resume-upload').click();
    };

    const handleEditClick = () => {
        setFileName('');
        setFileSize('');
        triggerFileInput();
    };

    const handleSave = () => {
        if (!fileName) {
            alert('Resume/CV Upload is mandatory.');
            return;
        }
        
        const resumeData = {
            fileName,
            fileSize,
            linkedInUrl,
            portfolioLink
        };
        
        if (onSave) {
            onSave(resumeData);
        }
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-[520px] bg-white rounded-lg shadow-md overflow-auto max-h-[90vh] relative">
                        <div className="flex flex-col w-full p-8 gap-5">
                            <div className="absolute top-5 right-5">
                                <button
                                    onClick={onClose}
                                    className="w-[22px] h-[22px] bg-[#005382] rounded-full flex items-center justify-center text-white text-sm leading-none"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-1">
                                <h2 className="text-2xl font-semibold text-[#1f2937] mt-0 mb-0">
                                    Add your Resume
                                </h2>
                                <p className="text-sm text-[#6b7280] mt-1">
                                    Upload your resume, linkedin and/or
                                    portfolio link
                                </p>
                                <div className="border-t border-[#d1d5db] w-[440px] mt-4" />

                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1f2937]">
                                    Resume/CV Upload
                                    <span className="text-red-500">*</span>
                                </label>

                                {!fileName ? (
                                    <button
                                        type="button"
                                        onClick={triggerFileInput}
                                        className="w-full h-12 bg-[#939393] hover:bg-[#374151] text-white font-semibold rounded-lg transition-colors"
                                    >
                                        Upload Resume
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-between px-1">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="flex items-center justify-center"
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 36,
                                                    padding: 8,
                                                    backgroundColor: '#D2EFFF',
                                                }}
                                            >
                                                <Image
                                                    src={Doc}
                                                    alt="Document"
                                                    width={24}
                                                    height={24}
                                                    style={{ color: '#005382' }}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-semibold" style={{ color: '#005382' }}>
                                                    {fileName}
                                                </span>
                                                <span className="text-sm text-[#9ca3af] lowercase">
                                                    {fileSize}
                                                </span>
                                            </div>
                                        </div>
                                        <button onClick={handleEditClick}>
                                            <Image
                                                src={Pen}
                                                alt="Edit"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer"
                                            />
                                        </button>
                                    </div>
                                )}

                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1f2937]">
                                    LinkedIn URL{' '}
                                    <span className="text-[#9ca3af]">
                                        (Optional)
                                    </span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="http://www.linkedin.com"
                                    className="w-full h-12 px-4 border border-[#d1d5db] rounded-lg text-base"
                                    value={linkedInUrl}
                                    onChange={(e) =>
                                        setLinkedInUrl(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1f2937]">
                                    Portfolio Link{' '}
                                    <span className="text-[#9ca3af]">
                                        (Optional)
                                    </span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="http://www.portfolio.com"
                                    className="w-full h-12 px-4 border border-[#d1d5db] rounded-lg text-base"
                                    value={portfolioLink}
                                    onChange={(e) =>
                                        setPortfolioLink(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={!fileName}
                                className={`w-full h-12 ${
                                    fileName
                                        ? 'bg-[#005382] hover:bg-[#00446b] text-white'
                                        : 'bg-[#d5e8ec] text-white cursor-not-allowed'
                                } font-semibold rounded-lg transition-colors`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Resume;
