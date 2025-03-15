'use client';

import React, { useState } from "react";
import Image from "next/image";
import Doc from "@/assets/images/doc.svg";
import Pen from "@/assets/images/Pen.svg";

const Resume = ({ isOpen, onClose }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("resume-upload").click();
  };

  const handleEditClick = () => {
    setFileName("");
    triggerFileInput();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[520px] h-[484px] bg-white rounded-lg shadow-md">
          <div className="flex flex-col w-full h-full p-8 gap-5">
            <div className="absolute top-5 right-5">
              <button
                onClick={onClose}
                className="w-[22px] h-[22px] bg-[#005382] rounded-full flex items-center justify-center text-white text-sm leading-none"
              >
                ✕
              </button>
            </div>

            <h2 className="text-2xl font-semibold text-[#1f2937] mt-0">Add your Resume</h2>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-[#1f2937]">LinkedIn URL</label>
              <input
                type="url"
                placeholder="http://www.linkedin.com"
                className="w-full h-12 px-4 border border-[#d1d5db] rounded-lg text-base"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-[#1f2937]">Portfolio link</label>
              <input
                type="url"
                placeholder="http://www.portfolio.com"
                className="w-full h-12 px-4 border border-[#d1d5db] rounded-lg text-base"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-[#1f2937] mb-3">Resume/CV Upload</label>
              {!fileName ? (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-full h-12 bg-[#939393] hover:bg-[#374151] text-white font-semibold rounded-lg transition-colors"
                >
                  Upload Resume
                </button>
              ) : (
                <div className="flex items-center justify-between px-4 h-12 bg-[#f3f4f6] border border-[#d1d5db] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#dbeafe]">
                      <Image src={Doc} alt="Document" height={20} width={20} />
                    </div>
                    <span className="font-semibold text-[#1d4ed8]">{fileName}</span>
                  </div>
                  <Image
                    src={Pen}
                    alt="Edit"
                    height={20}
                    width={20}
                    onClick={handleEditClick}
                    className="cursor-pointer"
                  />
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

            <p className="text-xs text-[#6b7280]">
              Your phone number will remain private and will not be shared or used
              for marketing purposes.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Resume;
