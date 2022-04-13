// tslint:disable:no-bitwise

export enum PrincipalType {
	User = 1 << 0,
	DistributionList = 1 << 1,
	SecurityGroup = 1 << 2,
	SharePointGroup = 1 << 3
}
