"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import Link from "next/link";
import logo from "../../public/logos.png";
import stamp from "../../public/stamp.png";
import Image from "next/image";
import dayjs from "dayjs";
import { CSSProperties } from "react";


interface IemployeeData {
  id: string;
  name: string;
  hiredDate: Date | string;
  TIN: number;
  bonus: bonus;
  jobInformation: jobInformation;
  CompanyInformation: CompanyInformation;
}

interface bonus {
  id: string;
  name: string;
  variable_pay: bigint;
  vp_percent: string;
  vp_total: bigint;
  allowance: bigint;
  exam_bonus: bigint;
  ieb: bigint;
  cdb: bigint;
  eodb: bigint;
  spv: bigint;
  vat_collection: bigint;
  payment_collection: bigint;
  other_bonus: bigint;
  total_award: bigint;
}

interface jobInformation {
  salary: bigint;
  position: string;
  basic: bigint;
  payPeriod: number;
  payDate: Date | string;
}

interface CompanyInformation {
  CompanyWebsite: string;
  companyName: string;
  Address: string;
  Location: string;
}

export interface PropData {
  employeeData: IemployeeData;
}


type TableProps = {
  headers: string[];
  rows: { data: string; title: string; classname?: string; span?: number; style?: CSSProperties }[][];
  className?: string;
};

export const Table: React.FC<TableProps> = ({
  headers,
  rows,
  className = "",
}) => {
  const span = Math.floor(12 / headers.length);
  return (
    <table
      style={tableStyle}
    >
      <thead style={tableHeaderStyle}>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              style={tableRawStyle}
              colSpan={span}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={tableDataStyle}
                colSpan={cell.span}
              >
                {`${cell.title != "" && cell.title} ${cell.data}`}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const containerStyle = {
  padding: "2rem", 
borderWidth:"1px", 
borderColor: "#D1D5DB",
color: "#000000",
backgroundcolor: "#ffffff",
boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
maxWidth: "800px"

};

const buttonStyle = {
  backgroundColor: '#00b0f0',
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  marginTop: "1rem",
  borderRadius: "0.25rem",
  color: "#ffffff",
};

const headerContainerStyle = {
  display: "flex", 
  justifyContent: "space-between"
};

const headerStyle = {
  paddingBottom: "1rem", 
alignSelf: "flex-end",
};

const header1Style = {
  fontSize: "1.5rem",
  lineHeight: "2rem", 
  fontWeight: 700,
};

const linkStyle = {
  textDecoration: "underline",
  color: "#00b0f0"};

  const textStyle: CSSProperties = {
    textAlign: "right" };

  
  const stampStyle: CSSProperties = {
    position: "absolute",
    right: "2.5rem", 
    top: "7rem" };

const tableStyle = {
  marginBottom: "2.5rem",
  borderWidth: "1px",
  borderColor: "#000000", 
  width: "100%",
  fontSize: "0.875rem",
  lineHeight: "1.25rem", 
  TextAlign:" center", 
  borderCollapse: "collapse" as "collapse" };

const tableRawStyle = {
  paddingTop: "0.5rem",
paddingBottom: "0.5rem", 
paddingLeft: "1rem",
paddingRight: "1rem",
borderTopWidth: "1px",
borderBottomWidth: "1px",
borderColor: "#000000" 
};

const tableDataStyle = {
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem", 
  paddingLeft: "1rem",
  paddingRight: "1rem",
  borderWidth: "1px", 
  borderColor:"#000000" };

  const borderStyle = {
    borderStyle: "none"};

    const stampImgStyle = {
      width: "8rem", 
TextAlign: "right" 
    };

    const sectionStyle = { 
      marginTop: "1.5rem"};

      const footerStyle = {
        borderTopWidth: "1px", 
borderRightWidth: 0, 
fontWeight: 700
      };

      const footerLeftStyle = {
        borderTopWidth: "1px", 
borderLeftWidth: 0, 
fontWeight: 700
      };

      const borderRightStyle = {
borderRightWidth: 0,};

const divStyle: CSSProperties = {
  position: "relative", 
  marginBottom: "6rem",
};

const deductionDivStyle: CSSProperties = { 
  position: "absolute",  
bottom:" 0.25rem", 
right: "1.25rem" };

const stamp1Style: CSSProperties = {
  width: "6rem", };

  const tableHeaderStyle: CSSProperties = {
    color: "#ffffff",
background: "#00b0f0"};


const Page = () => {
  const employeeData: IemployeeData = {
    id: "e12345",
    name: "John Doe",
    hiredDate: "2022-12-15",
    TIN: 74513889,
    bonus: {
      id: "b001",
      name: "Yearly Bonus",
      variable_pay: BigInt(5000),
      vp_percent: "10%",
      vp_total: BigInt(50000),
      allowance: BigInt(2000),
      exam_bonus: BigInt(1500),
      ieb: BigInt(3000),
      cdb: BigInt(2500),
      eodb: BigInt(3500),
      spv: BigInt(4000),
      vat_collection: BigInt(1000),
      payment_collection: BigInt(2000),
      other_bonus: BigInt(1500),
      total_award: BigInt(26000),
    },
    jobInformation: {
      salary: BigInt(120000),
      basic: BigInt(50000),
      position: "Software Engineer",
      payPeriod: 30,
      payDate: "2022-12-15T00:00:00.000Z",
    },
    CompanyInformation: {
      CompanyWebsite: "www.ienetworksolutions.com",
      companyName: "IE Networks",
      Address: "Festival 22, 7th floor",
      Location: "Addis Ababa, Ethiopia",
    },
  };
  
  const payslipRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    const input = payslipRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.75);
        const pdf = new jsPDF("p", "mm", "a4");
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
        style={buttonStyle}
      >
        Download PDF
      </button>
      <div
        ref={payslipRef}
style={containerStyle}      >
        <div style={headerContainerStyle}>
          <Image src={logo} alt="" style={stamp1Style} />
          <header style={headerStyle}>
            <h1 style={header1Style}>
              Pay Slip for the Month of{" "}
              {dayjs(employeeData?.hiredDate).format("MMMM ")}
            </h1>
          </header>
          <div>
            <Link
              href="https://www.ienetworksolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              {employeeData?.CompanyInformation?.CompanyWebsite}
            </Link>
            <p style={textStyle}>Festival 22, 7th floor</p>
            <p style={textStyle}>Addis Ababa, Ethiopia</p>
          </div>
        </div>

        <section>
          <Table
            headers={[`Employee Name  ${employeeData?.name}`]}
            rows={[
              [
                {
                  title: "Company Name:",
                  data: `${employeeData?.CompanyInformation?.companyName}`,
                  span: 4,
                },
                {
                  title: "Job Title:",
                  data: ` ${employeeData?.jobInformation?.position}`,
                  span: 4,
                },
                {
                  title: "Date Hired:",
                  data: `${dayjs(employeeData?.hiredDate).format(
                    "YYYY-MM-DD"
                  )}`,
                  span: 4,
                },
              ],
              [
                {
                  title: "Salary Period:",
                  data: `${employeeData.jobInformation.payPeriod}`,
                  span: 4,
                },
                { title: "TIN:", data: "75894565", span: 4, },
                {
                  title: "Location:",
                  data: `${employeeData.CompanyInformation.Location}`,
                  span: 3,
                },
                {
                  title: "Pay Date:",
                  data: `${dayjs(employeeData?.hiredDate).format(
                    "YYYY-MM-DD"
                  )}`,
                  span: 3,
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
                  
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.jobInformation.basic}`,
                  
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Transport Allowance`,
                  
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.jobInformation.basic}`,
                  
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Total Earning`,
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.jobInformation.basic}`,
                  span: 6,
                },
              ],
            ]}
          />
        </section>
        <div style={divStyle}>
          <section>
            <Table
              headers={["Bonus"]}
              rows={[
                [
                  {
                    title: " ",
                    data: `variable pay`,
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.name} ( ${employeeData.bonus.name}/
                  ${employeeData.bonus.name}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Allowance`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.allowance}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Exam Bonus`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.exam_bonus}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Implementation Effectiveness`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.exam_bonus}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Effective Order and Delivery`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.exam_bonus}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Closed Deal`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.cdb}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Staff Performance Evaluation`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.spv}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Timely VAT Collection`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.exam_bonus}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Timely Payment Collection`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.exam_bonus}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Best Employee’s Productivity and Engagement`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.exam_bonus}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Facilities High Availability Quarterly`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.exam_bonus}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Management Performance Evaluation`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.exam_bonus}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Other Bonus`,
                    
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.total_award}`,
                    
                    span: 6,
                  },
                ],
                [
                  {
                    title: " ",
                    data: `Total Earnings`,
                    style: footerStyle,
                    span: 6,
                  },
                  {
                    title: " ",
                    data: `ETB ${employeeData.bonus.total_award}`,
                    style: footerStyle,
                    span: 6,
                  },
                ],
              ]}
            />
          </section>
          <div style={deductionDivStyle}>
            <Image src={stamp} alt="" style={stampImgStyle} />
          </div>
        </div>

        <section>
          <Table
            headers={["Deduction"]}
            rows={[
              [
                { title: " ", data: `tax`,  span: 6 },
                {
                  title: " ",
                  data: `ETB ${employeeData.jobInformation.basic}`,
                  
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Employee Pension`,
                  
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.total_award}`,
                  
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Medical`,
                  
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.allowance}`,
                  
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Absenteeism`,
                  
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.spv}`,
                  
                  span: 6,
                },
              ],
              [
                { title: " ", data: `PMA`,  span: 6 },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Car Maintenance`,
                  
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.cdb}`,
                  
                  span: 6,
                },
              ],
              [
                { title: " ", data: `GYM`,  span: 6 },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.exam_bonus}`,
                  
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Late Comer`,
                  
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.cdb}`,
                  
                  span: 6,
                },
              ],

              [
                {
                  title: " ",
                  data: `Other Deduction`,
                  
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.total_award}`,
                  
                  span: 6,
                },
              ],
              [
                { title: " ", data: `Loan`,  span: 6 },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.cdb}`,
                  
                  span: 6,
                },
              ],
              [
                {
                  title: " ",
                  data: `Total Deduction`,
                  style: footerStyle,
                  span: 6,
                },
                {
                  title: " ",
                  data: `ETB ${employeeData.bonus.cdb}`,
                  style: footerLeftStyle,
                  span: 6,
                },
              ],
            ]}
          />
        </section>
        <div style={divStyle}>
          <section style={sectionStyle}>
            <Table
              headers={[`Payment Method Detail`]}
              rows={[
                [
                  {
                    title: "Payment Method:",
                    data: `{bank}`,
                    span: 4,
                    style: borderRightStyle,
                  },
                ],
                [
                  {
                    title: "Bank Name:",
                    data: `"{bank_name}`,
                    span: 4,
                  },
                  {
                    title: "Account Number:",
                    data: `ETB ${employeeData.jobInformation.position}`,
                    span: 4,
                  },
                  {
                    title: "Amount:",
                    data: `ETB ${employeeData.jobInformation.basic}`,
                    span: 4,
                  },
                ],
              ]}
            />
          </section>
          <div style={stampStyle}>
            <Image src={stamp} alt="" style={stampImgStyle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
