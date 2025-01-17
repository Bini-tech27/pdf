"use client";
import { PropData, tableFormat } from "../pdf/page";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { Table } from "@/app/component/table";
import Link from "next/link";
import logo from "../../public/logos.png";
import stamp from "../../public/stamp.png";
import Image from "next/image";
import dayjs from "dayjs";

export const Payslip: React.FC<PropData> = ({ employeeData }) => {
  const payslipRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    const input = payslipRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.75); 
        const pdf = new jsPDF("p", "mm", "a4", );
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
  
        let position = 0;
  
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save("payslip.pdf");
      });
    }
  };
  

  return (
    <>
      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
      <div
        ref={payslipRef}
        className="p-8 bg-white text-black max-w-[800px] mx-auto border border-gray-300 shadow-md"
      >
        <div className=" flex justify-between ">
          <Image src={logo} alt="" className="w-24 " />
          <header className="text-center self-end  pb-4">
          <h1 className="text-2xl font-bold ">
            Pay Slip for the Month of {dayjs(employeeData.hiredDate).format("MMMM ")}
          </h1>
        </header>
          <div>
            <Link
              href="https://www.ienetworksolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00b0f0] underline"
              
            >
              {employeeData.CompanyInformation.CompanyWebsite}
            </Link>
            <p className="text-right">Festival 22, 7th floor</p>
            <p className="text-right">Addis Ababa, Ethiopia</p>
          
          </div>
        
        </div>
        
        <section >
          <Table
            headers={[`Employee Name  ${employeeData.name}`]}
            rows={[
              [
                {
                  title: "Company Name:",
                  data: `${employeeData.CompanyInformation.companyName}`,
                  span: 4,
                  classname: " ",
                },
                {
                  title: "Job Title:",
                  data: ` ${employeeData.jobInformation.position}`,
                  span: 4,
                  classname: "",
                },
                {
                  title: "Date Hired:",
                  data: `${dayjs(employeeData.hiredDate).format("YYYY-MM-DD")}`,
                  span: 4,
                  classname: "",
                },
              ],
              [
                {
                  title: "Salary Period:",
                  data: `${employeeData.jobInformation.payPeriod}`,
                  span: 4,
                  classname: "",
                },
                { title: "TIN:", data: "75894565", span: 4, classname: "" },
                {
                  title: "Location:",
                  data:`${employeeData.CompanyInformation.Location}`,
                  span: 3,
                  classname: "",
                },
                {
                  title: "Pay Date:",
                  data: `${dayjs(employeeData.hiredDate).format("YYYY-MM-DD")}`,
                  span: 3,
                  classname: "",
                },
              ],
            ]}
          />
        </section>
        <section>
          <Table
            headers={["Earning", "Amount"]}
            rows={[
              [
                {
                  title: " ",
                  data: `Basic Salary`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.jobInformation.basic}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Transport Allowance`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.jobInformation.basic}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Total Earning`,
                  classname: "border-t border-r-0 font-bold",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.jobInformation.basic}`,
                  classname: "border-t  border-l-0 font-bold",
                  span: 6,
                },
              ],
            ]}
          />
        </section>
        <div className="relative mb-24 ">

        <section>
          <Table
            headers={["Bonus"]}
            rows={[
              [
                {
                  title: " ",
                  data: `variable pay`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.name} ( ${employeeData.bonus.name}/
                  ${employeeData.bonus.name}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Allowance`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.allowance}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Exam Bonus`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Implementation Effectiveness`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Effective Order and Delivery`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Closed Deal`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.cdb}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Staff Performance Evaluation`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.spv}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Timely VAT Collection`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Timely Payment Collection`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Best Employee’s Productivity and Engagement`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Facilities High Availability Quarterly`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Management Performance Evaluation`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Other Bonus`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.total_award}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Total Earnings`,
                  classname: "border-t  border-r-0 font-bold",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.total_award}`,
                  classname: "border-t  border-l-0 font-bold ",
                  span: 6,
                },
              ],
            ]}
          />
        </section>
        <div className="absolute bottom-1 right-5">
            <Image src={stamp} alt="" className="w-32 text-right " />
          </div>
        </div>
        
                <section>
          <Table
            headers={["Deduction"]}
            rows={[
              [
                { title: " ", data: `tax`, classname: "border-none", span: 6 },
                {
                  title: " ",
                  data: `ETB ${employeeData.jobInformation.basic}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Employee Pension`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.total_award}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Medical`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.allowance}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Absenteeism`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.spv}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                { title: " ", data: `PMA`, classname: "border-none", span: 6 },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Car Maintenance`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.cdb}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                { title: " ", data: `GYM`, classname: "border-none", span: 6 },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Late Comer`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.cdb}`,
                  classname: "border-none",
                  span: 6,
                },
              ],

              [
                {
                  title: " ",
                  data: `Other Deduction`,
                  classname: "border-none",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.total_award}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                { title: " ", data: `Loan`, classname: "border-none", span: 6 },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.cdb}`,
                  classname: "border-none",
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Total Deduction`,
                  classname: "border-t  border-r-0 font-bold ",
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.cdb}`,
                  classname: "border-t  border-l-0 font-bold",
                  span: 6,
                },
              ],
            ]}
          />
        </section>
        <div className="relative mb-24">
          <section className="mt-6">
            <Table
              headers={[`Payment Method Detail`]}
              rows={[
                [
                  {
                    title: "Payment Method:",
                    data: `{bank}`,
                    span: 4,
                    classname: "border-r-0 ",
                  },
                ],
                [
                  {
                    title: "Bank Name:",
                    data: `"{bank_name}`,
                    span: 4,
                    classname: " ",
                  },
                  {
                    title: "Account Number:",
                    data: `ETB ${employeeData.jobInformation.position}`,
                    span: 4,
                    classname: "",
                  },
                  {
                    title: "Amount:",
                    data: `ETB ${employeeData.jobInformation.basic}`,
                    span: 4,
                    classname: "",
                  },
                ],
              ]}
            />
          </section>
          <div className="absolute top-28 right-10">
            <Image src={stamp} alt="" className="w-32 text-right " />
          </div>
        </div>
      </div>
    </>
  );
};
