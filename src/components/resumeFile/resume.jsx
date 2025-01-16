"use client";
import React, { useState } from "react";
import Image from "next/image";
import Doc from "@/assets/images/doc.svg";
import Pen from "@/assets/images/Pen.svg";

const Resume = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("resume-upload");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleEditClick = () => {
    setFileName("");
    triggerFileInput();
  };

  return (
    <>
      <div className="flex justify-center flex-wrap bg-white pl-[20px] pr-[20px] pt-[48px]">
        <div className="flex w-auto flex-col gap-[24px] max-w-[328px]">
          <div className="flex flex-col gap-[8px]">
            <p className="block text-sm font-semibold text-[#2F2F2F]">
              LinkedIn URL
            </p>
            <input
              type="url"
              id="linkedin"
              placeholder="http://www.linkedin.com/johnadams"
              className="w-full h-[48px] max-w-[328px] border p-[12px] border-gray-300 rounded-[8px]"
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <p className="block text-sm font-semibold text-[#2F2F2F]">
              Portfolio link
            </p>
            <input
              type="url"
              id="portfolio"
              placeholder="http://www.johnadams.com"
              className="w-full p-[12px] max-w-[328px] h-[48px] border border-gray-300 rounded-[8px]"
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <p className="block text-sm font-semibold text-[#2F2F2F]">
              Resume/CV Upload
            </p>

            {!fileName ? (
              <>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-full pl-[20px] pr-[20px] text-[12px] font-semibold pt-[11px] pb-[11px] bg-[#939393] text-white rounded-[8px]"
                >
                  Upload Resume
                </button>

                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </>
            ) : (
              <div className="flex items-center justify-between gap-[8px]  w-full h-[48px] max-w-[328px] ">
                <div className="h-[40px] w-[40px] flex flex-shrink-0 justify-center items-center rounded-full bg-[#D2EFFF]">
                  <Image src={Doc} alt="Document Icon" height={24} width={24} />
                </div>
                <span className="font-semibold text-lg text-[#005382]">{fileName}</span>
                <Image
                  src={Pen}
                  alt="Edit Icon"
                  height={24}
                  width={24}
                  onClick={handleEditClick}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;