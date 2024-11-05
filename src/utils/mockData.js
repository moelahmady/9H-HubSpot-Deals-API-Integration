import { v4 as uuidv4 } from "uuid";

const companies = [
  "Acme Corp",
  "GlobalTech Solutions",
  "Quantum Dynamics",
  "Atlas Industries",
  "Pinnacle Systems",
  "Nexus Innovations",
  "Stellar Enterprises",
  "Vertex Solutions",
  "Omega Technologies",
  "Phoenix Industries",
  "Titan Manufacturing",
  "Eclipse Software",
  "Delta Dynamics",
  "Horizon Systems",
  "Matrix Solutions",
  "Vector Industries",
  "Summit Technologies",
  "Apex Corporation",
  "Nova Enterprises",
  "Prime Solutions",
];

const products = [
  "Enterprise License",
  "Cloud Migration",
  "Security Suite",
  "Data Analytics Platform",
  "IoT Solution",
  "AI Implementation",
  "Infrastructure Upgrade",
  "Digital Transformation",
  "Consulting Services",
  "Maintenance Contract",
  "Software Development",
  "Hardware Upgrade",
  "Training Program",
  "Support Package",
  "Research Partnership",
  "Innovation Lab",
  "Automation System",
  "Quality Assurance",
  "Mobile Platform",
  "Integration Services",
];

export const generateRandomDeal = (index) => {
  const company = companies[index % companies.length];
  const product = products[Math.floor(Math.random() * products.length)];
  const amount = Math.floor(Math.random() * 900000) + 100000;

  const pipelines = ["default", "enterprise", "midmarket"];
  const stages = [
    "appointmentscheduled",
    "qualifiedtobuy",
    "presentationscheduled",
    "decisionmakerboughtin",
    "contractsent",
    "closedwon",
  ];
  const priorities = ["high", "medium", "low"];

  // Calculate closedate between now and 1 year from now
  const today = new Date();
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(today.getFullYear() + 1);
  const randomDate = new Date(
    today.getTime() +
      Math.random() * (oneYearFromNow.getTime() - today.getTime())
  );

  return {
    dealname: `${company} - ${product}`,
    amount,
    closedate: randomDate.toISOString().split("T")[0],
    pipeline: pipelines[Math.floor(Math.random() * pipelines.length)],
    dealstage: stages[Math.floor(Math.random() * stages.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  };
};
