import { IUser } from "../models";

const baseProductionCdnUrl = "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/";

const TestImages = {
	personaFemale: baseProductionCdnUrl + "persona-female.png",
	personaMale: baseProductionCdnUrl + "persona-male.png"
};

export const MockUsers: IUser[] = [
	{
		additionalProperties: {
			businessPhones: [],
			givenName: undefined,
			imageUrl: undefined,
			jobTitle: undefined,
			mail: "Adams@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: undefined,
			preferredLanguage: undefined,
			surname: undefined
		},
		displayName: "Conf Room Adams",
		id: "6e7b768e-07e2-4810-8459-485f84f8f204",
		type: "User",
		userPrincipalName: "Adams@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 425 555 0109"],
			givenName: "Adele",
			imageUrl: TestImages.personaFemale,
			jobTitle: "Product Marketing Manager",
			mail: "AdeleV@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "18/2111",
			preferredLanguage: "en-US",
			surname: "Vance"
		},
		displayName: "Adele Vance",
		id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
		type: "User",
		userPrincipalName: "AdeleV@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["8006427676"],
			givenName: "MOD",
			imageUrl: undefined,
			jobTitle: undefined,
			mail: "admin@M365x214355.onmicrosoft.com",
			mobilePhone: "5555555555",
			officeLocation: undefined,
			preferredLanguage: "en-US",
			surname: "Administrator"
		},
		displayName: "MOD Administrator",
		id: "5bde3e51-d13b-4db1-9948-fe4b109d11a7",
		type: "User",
		userPrincipalName: "admin@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 858 555 0110"],
			givenName: "Alex",
			imageUrl: TestImages.personaMale,
			jobTitle: "Marketing Assistant",
			mail: "AlexW@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "131/1104",
			preferredLanguage: "en-US",
			surname: "Wilber"
		},
		displayName: "Alex Wilber",
		id: "4782e723-f4f4-4af3-a76e-25e3bab0d896",
		type: "User",
		userPrincipalName: "AlexW@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 262 555 0106"],
			givenName: "Allan",
			imageUrl: TestImages.personaMale,
			jobTitle: "Corporate Security Officer",
			mail: "AllanD@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "24/1106",
			preferredLanguage: "en-US",
			surname: "Deyoung"
		},
		displayName: "Allan Deyoung",
		id: "c03e6eaa-b6ab-46d7-905b-73ec7ea1f755",
		type: "User",
		userPrincipalName: "AllanD@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: [],
			givenName: undefined,
			imageUrl: undefined,
			jobTitle: undefined,
			mail: "Baker@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: undefined,
			preferredLanguage: undefined,
			surname: undefined
		},
		displayName: "Conf Room Baker",
		id: "013b7b1b-5411-4e6e-bdc9-c4790dae1051",
		type: "User",
		userPrincipalName: "Baker@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 732 555 0102"],
			givenName: "Ben",
			imageUrl: TestImages.personaMale,
			jobTitle: "VP Sales",
			mail: "BenW@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "19/3123",
			preferredLanguage: "en-US",
			surname: "Walters"
		},
		displayName: "Ben Walters",
		id: "f5289423-7233-4d60-831a-fe107a8551cc",
		type: "User",
		userPrincipalName: "BenW@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: [],
			givenName: "Brian",
			imageUrl: TestImages.personaMale,
			jobTitle: undefined,
			mail: "BrianJ@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: undefined,
			preferredLanguage: undefined,
			surname: "Johnson"
		},
		displayName: "Brian Johnson (TAILSPIN)",
		id: "e46ba1a2-59e7-4019-b0fa-b940053e0e30",
		type: "User",
		userPrincipalName: "BrianJ@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 858 555 0111"],
			givenName: "Christie",
			imageUrl: TestImages.personaFemale,
			jobTitle: "Sr. VP Sales &amp; Marketing",
			mail: "ChristieC@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "131/2105",
			preferredLanguage: "en-US",
			surname: "Cline"
		},
		displayName: "Christie Cline",
		id: "b66ecf79-a093-4d51-86e0-efcc4531f37a",
		type: "User",
		userPrincipalName: "ChristieC@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: [],
			givenName: undefined,
			imageUrl: undefined,
			jobTitle: undefined,
			mail: "Crystal@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: undefined,
			preferredLanguage: undefined,
			surname: undefined
		},
		displayName: "Conf Room Crystal",
		id: "8528d6e9-dce3-45d1-85d4-d2db5f738a9f",
		type: "User",
		userPrincipalName: "Crystal@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 425 555 0105"],
			givenName: "Debra",
			imageUrl: TestImages.personaFemale,
			jobTitle: "Administrative Assistant",
			mail: "DebraB@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "18/2107",
			preferredLanguage: "en-US",
			surname: "Berger"
		},
		displayName: "Debra Berger",
		id: "d4957c9d-869e-4364-830c-d0c95be72738",
		type: "User",
		userPrincipalName: "DebraB@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 205 555 0108"],
			givenName: "Diego",
			imageUrl: TestImages.personaMale,
			jobTitle: "CVP Finance",
			mail: "DiegoS@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "14/1108",
			preferredLanguage: "en-US",
			surname: "Siciliani"
		},
		displayName: "Diego Siciliani",
		id: "24fcbca3-c3e2-48bf-9ffc-c7f81b81483d",
		type: "User",
		userPrincipalName: "DiegoS@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+81 345550115"],
			givenName: "Emily",
			imageUrl: TestImages.personaFemale,
			jobTitle: "Budget Analyst",
			mail: "EmilyB@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "97/2302",
			preferredLanguage: "en-US",
			surname: "Braun"
		},
		displayName: "Emily Braun",
		id: "2804bc07-1e1f-4938-9085-ce6d756a32d2",
		type: "User",
		userPrincipalName: "EmilyB@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 205 555 0103"],
			givenName: "Enrico",
			imageUrl: TestImages.personaMale,
			jobTitle: "Attorney",
			mail: "EnricoC@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "14/1102",
			preferredLanguage: "en-US",
			surname: "Cattaneo"
		},
		displayName: "Enrico Cattaneo",
		id: "16cfe710-1625-4806-9990-91b8f0afee35",
		type: "User",
		userPrincipalName: "EnricoC@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 309 555 0104"],
			givenName: "Grady",
			imageUrl: TestImages.personaMale,
			jobTitle: "CVP Legal",
			mail: "GradyA@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "19/2109",
			preferredLanguage: "en-US",
			surname: "Archie"
		},
		displayName: "Grady Archie",
		id: "df043ff1-49d5-414e-86a4-0c7f239c36cf",
		type: "User",
		userPrincipalName: "GradyA@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 954 555 0118"],
			givenName: "Henrietta",
			imageUrl: TestImages.personaFemale,
			jobTitle: "Marketing Assistant",
			mail: "HenriettaM@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "18/1106",
			preferredLanguage: "en-US",
			surname: "Mueller"
		},
		displayName: "Henrietta Mueller",
		id: "c8913c86-ceea-4d39-b1ea-f63a5b675166",
		type: "User",
		userPrincipalName: "HenriettaM@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: [],
			givenName: undefined,
			imageUrl: undefined,
			jobTitle: undefined,
			mail: "Hood@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: undefined,
			preferredLanguage: undefined,
			surname: undefined
		},
		displayName: "Conf Room Hood",
		id: "3fec04fc-e036-42f4-8f6f-b3b02288085c",
		type: "User",
		userPrincipalName: "Hood@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 309 555 0101"],
			givenName: "Irvin",
			imageUrl: TestImages.personaMale,
			jobTitle: "Director",
			mail: "IrvinS@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "19/2106",
			preferredLanguage: "en-US",
			surname: "Sayers"
		},
		displayName: "Irvin Sayers",
		id: "baafca12-9874-4765-9576-e0e5cafe491b",
		type: "User",
		userPrincipalName: "IrvinS@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 918 555 0101"],
			givenName: "Isaiah",
			imageUrl: TestImages.personaMale,
			jobTitle: "Web Marketing Manager",
			mail: "IsaiahL@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "20/1101",
			preferredLanguage: "en-US",
			surname: "Langer"
		},
		displayName: "Isaiah Langer",
		id: "e3d0513b-449e-4198-ba6f-bd97ae7cae85",
		type: "User",
		userPrincipalName: "IsaiahL@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 502 555 0102"],
			givenName: "Johanna",
			imageUrl: TestImages.personaFemale,
			jobTitle: "CVP Engineering",
			mail: "JohannaL@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "23/2102",
			preferredLanguage: "en-US",
			surname: "Lorenz"
		},
		displayName: "Johanna Lorenz",
		id: "626cbf8c-5dde-46b0-8385-9e40d64736fe",
		type: "User",
		userPrincipalName: "JohannaL@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 980 555 0101"],
			givenName: "Joni",
			imageUrl: TestImages.personaFemale,
			jobTitle: "Paralegal",
			mail: "JoniS@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "20/1109",
			preferredLanguage: "en-US",
			surname: "Sherman"
		},
		displayName: "Joni Sherman",
		id: "8b209ac8-08ff-4ef1-896d-3b9fde0bbf04",
		type: "User",
		userPrincipalName: "JoniS@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 913 555 0101"],
			givenName: "Lee",
			imageUrl: TestImages.personaMale,
			jobTitle: "CVP Research &amp; Development",
			mail: "LeeG@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "23/3101",
			preferredLanguage: "en-US",
			surname: "Gu"
		},
		displayName: "Lee Gu",
		id: "074e56ea-0b50-4461-89e5-c67ae14a2c0b",
		type: "User",
		userPrincipalName: "LeeG@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 918 555 0107"],
			givenName: "Lidia",
			imageUrl: TestImages.personaFemale,
			jobTitle: "Product Manager",
			mail: "LidiaH@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "20/2107",
			preferredLanguage: "en-US",
			surname: "Holloway"
		},
		displayName: "Lidia Holloway",
		id: "2ed03dfd-01d8-4005-a9ef-fa8ee546dc6c",
		type: "User",
		userPrincipalName: "LidiaH@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 918 555 0104"],
			givenName: "Lynne",
			imageUrl: undefined,
			jobTitle: "Product Manager",
			mail: "LynneR@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "20/1104",
			preferredLanguage: "en-US",
			surname: "Robbins"
		},
		displayName: "Lynne Robbins",
		id: "e8a02cc7-df4d-4778-956d-784cc9506e5a",
		type: "User",
		userPrincipalName: "LynneR@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 412 555 0109"],
			givenName: "Megan",
			imageUrl: undefined,
			jobTitle: "Auditor",
			mail: "MeganB@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "12/1110",
			preferredLanguage: "en-US",
			surname: "Bowen"
		},
		displayName: "Megan Bowen",
		id: "48d31887-5fad-4d73-a9f5-3c356e68a038",
		type: "User",
		userPrincipalName: "MeganB@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 858 555 0109"],
			givenName: "Miriam",
			imageUrl: undefined,
			jobTitle: "VP Marketing",
			mail: "MiriamG@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "131/2103",
			preferredLanguage: "en-US",
			surname: "Graham"
		},
		displayName: "Miriam Graham",
		id: "08fa38e4-cbfa-4488-94ed-c834da6539df",
		type: "User",
		userPrincipalName: "MiriamG@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 206 555 0105"],
			givenName: "Nestor",
			imageUrl: TestImages.personaMale,
			jobTitle: "CVP Operations",
			mail: "NestorW@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "36/2121",
			preferredLanguage: "en-US",
			surname: "Wilke"
		},
		displayName: "Nestor Wilke",
		id: "089a6bb8-e8cb-492c-aa41-c078aa0b5120",
		type: "User",
		userPrincipalName: "NestorW@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+1 502 555 0144"],
			givenName: "Patti",
			imageUrl: undefined,
			jobTitle: "President",
			mail: "PattiF@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "15/1102",
			preferredLanguage: "en-US",
			surname: "Fernandez"
		},
		displayName: "Patti Fernandez",
		id: "40079818-3808-4585-903b-02605f061225",
		type: "User",
		userPrincipalName: "PattiF@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: ["+20 255501070"],
			givenName: "Pradeep",
			imageUrl: TestImages.personaMale,
			jobTitle: "Accountant II",
			mail: "PradeepG@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: "98/2202",
			preferredLanguage: "en-US",
			surname: "Gupta"
		},
		displayName: "Pradeep Gupta",
		id: "ec63c778-24e1-4240-bea3-d12a167d5232",
		type: "User",
		userPrincipalName: "PradeepG@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: [],
			givenName: undefined,
			imageUrl: undefined,
			jobTitle: undefined,
			mail: "Rainier@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: undefined,
			preferredLanguage: undefined,
			surname: undefined
		},
		displayName: "Conf Room Rainier",
		id: "6f1c452b-f9f4-4f43-8c42-17e30ab0077c",
		type: "User",
		userPrincipalName: "Rainier@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: [],
			givenName: undefined,
			imageUrl: undefined,
			jobTitle: undefined,
			mail: "Stevens@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: undefined,
			preferredLanguage: undefined,
			surname: undefined
		},
		displayName: "Conf Room Stevens",
		id: "5c7188eb-da70-4f1a-a8a5-afc26c2fe22c",
		type: "User",
		userPrincipalName: "Stevens@M365x214355.onmicrosoft.com"
	},
	{
		additionalProperties: {
			businessPhones: [],
			givenName: undefined,
			imageUrl: undefined,
			jobTitle: undefined,
			mail: "support@M365x214355.onmicrosoft.com",
			mobilePhone: undefined,
			officeLocation: undefined,
			preferredLanguage: undefined,
			surname: undefined
		},
		displayName: "Support shared mailbox",
		id: "c4e9da8e-d5d1-4781-b945-bbe1eb906970",
		type: "User",
		userPrincipalName: "support@M365x214355.onmicrosoft.com"
	}
];
