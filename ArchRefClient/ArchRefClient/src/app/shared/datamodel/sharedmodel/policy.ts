import { PolicyType } from './policytype';

export class Policy {
  name: string;
  policyType: PolicyType;
  //policyTemplate: PolicyTemplate; 

  constructor(name: string, policyType: PolicyType) {
    this.name = name;
    this.policyType = policyType;
  }

  public getName(): string {
    return this.name;
  }

  public getPolicyType(): PolicyType {
    return this.policyType;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setPolicyType(policyType: PolicyType) {
    this.policyType = PolicyType;
  }
}
