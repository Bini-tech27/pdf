import dayjs from "dayjs";
import { Payslip } from "../ui/payslip";

interface employeeData {
    id: string;
    name: string;
    hiredDate: Date | string  ;  
    TIN: number;
    bonus: bonus;
    jobInformation: jobInformation;
    CompanyInformation:CompanyInformation;
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
    payPeriod:number;
    payDate:Date | string;


  }

  interface CompanyInformation {
    CompanyWebsite: string;
    companyName: string;
    Address: string;
    Location: string;
    
  }
  
  export interface PropData {
    employeeData: employeeData;
  }
  
  
  const employeeDataCopy: employeeData = {
    id: "e12345",
    name: "John Doe",
    hiredDate:"2022-12-15T00:00:00.000Z",
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
      basic:BigInt(50000),
      position: "Software Engineer",
      payPeriod:30,
    payDate: "2022-12-15T00:00:00.000Z"
    },
    CompanyInformation: {
      CompanyWebsite: "www.ienetworksolutions.com",
      companyName: "IE Networks",
      Address: "Festival 22, 7th floor",
      Location: "Addis Ababa, Ethiopia",
    }
  };


  
  
export default function Page() {
  return (
    <>
     <Payslip employeeData={employeeDataCopy} /> 
    </>
  );
}