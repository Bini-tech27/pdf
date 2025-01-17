import { Payslip } from "../ui/payslip";

interface employeeData {
    id: string;
    name: string;
    bonus: bonus;
    jobInformation: jobInformation;
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
    
  }
  
  export interface PropData {
    employeeData: employeeData;
  }
  export interface tableFormat {
    trows: {data:string,text:string,span:number,isheader:boolean}[][][];
  }
  
  const employeeDataCopy: employeeData = {
    id: "e12345",
    name: "John Doe",
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
    },
  };


  const ourData :tableFormat={
    trows:[[[{data:'Employee Information',text:'Employee Information',span:12,isheader:true}]],[[{data:'Tinsae MEsfin ',text:'Full Name',span:4,isheader:false}],[{data:'1000032132131 ',text:'Tin Number',span:4,isheader:false}],[{data:'332478942 ',text:'Pension Id',span:4,isheader:false}]]]
  }
  
export default function Page() {
  return (
    <>
     <Payslip employeeData={employeeDataCopy} /> 
    </>
  );
}