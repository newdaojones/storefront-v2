import { KycStatus } from "@prisma/client"

export const convertKycStatus = (status?: string) => {
  switch (status) {
    case 'pending':
      return KycStatus.PENDING
    case 'manual_review':
      return KycStatus.PENDING
    case 'rejected':
      return KycStatus.FAILED
    case 'active':
      return KycStatus.VERIFIED
    default:
      return KycStatus.NONE
  }
}