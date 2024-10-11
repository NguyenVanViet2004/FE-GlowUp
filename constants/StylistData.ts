import { GenderEnum } from '~/interfaces/enum/Gender'
import type Stylist from '~/interfaces/Stylist'

export const dataStylist: Stylist[] = [
  {
    _id: 'stylist1',
    avatarUrl: 'https://s3-alpha-sig.figma.com/img/3032/d295/a6ed830df5f2192238e45f5b9b143335?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kOosavv0UOTHNeJ~fHi-bUY80763V7TaAF7gWA~A3L0h1LabNsSnHeU7GVwQ7fW6kEdA9DDtRSYGTkTiblCOyUx2yo5n7IBEzUwodC59jtIIRuMEJZutpvOsZpC25vnxT09Zbeyx1puwjsM3Q3YV~bTkFjtQjMIhu3J1NmOFXufIqs4MFjQIUgr52Myk1NJbKWkN5yN6A1q7l8Tt-8m6I-uLpM~-KKIM7SD~SspGBEEL2WG11K10aMecRnVmeZdmN3DRy7rxq27oC~WAB45y6UCDdGjjoUxJy8CHWORUB6WGjdlneuVkfu9scgHoI0N2jYXJZiwrmjc5mpEjCM0yLQ__',
    email: 'Ronald@example.com',
    experience: '5 years',
    fullName: 'Ronald',
    gender: GenderEnum.MALE,
    isActive: true,
    phoneNumber: '0123456789',
    position: 'Hair Specialist',
    rating: 4.5,
    workSchedule: 'Monday - Saturday, 8 AM - 5 PM'
  },
  {
    _id: 'stylist2',
    avatarUrl: 'https://s3-alpha-sig.figma.com/img/d9b1/7465/66204234f626927fbee59dbcb09cb9bd?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Itk3-Qm25PsGtpFDLZ0CslpJCd0Zp1h5YOWIAr8uVtvMLQTo8qyiFWYCEzP-p0X4yingpH1W08vCCGCy2V7hQmKg470DGkt-W9rMNve0JDeEe-1TX1-4E8UU3~JagBgwjARqQ5yhuwYsOQtMTcKNP1-PR5HzLLu7W49hzuHqL~DdXnH7G~4RbfrdFyT1vaQ37K9oEBz20rAyVnYnTIOonrzsdVqQqEQncKUQN4wxGDEDcC-ad5x6DxZp-SMOiF8IfdgW8dxThRgAfXTBiinSDewwQAFkLKjGNgTu4SyuzoyCAHpVvc2fc5BfVkL3o4oY9aKxjaqpLJdfCH9bK9LIFw__',
    email: 'Merry@example.com',
    experience: '3 years',
    fullName: 'Merry',
    gender: GenderEnum.FEMALE,
    isActive: false,
    phoneNumber: '0987654321',
    position: 'Makeup Artist',
    rating: 4.7,
    workSchedule: 'Tuesday - Sunday, 10 AM - 6 PM'
  },
  {
    _id: 'stylist3',
    avatarUrl: 'https://s3-alpha-sig.figma.com/img/9cd0/d64e/d5bf1ed43aa22003022df88e03440d19?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P2GJTa48MmlhZUbTfmDPUXgEfpNsYirhqI7uJyfk4tfq1MUmy8SJBQlwW7pv~-9XqV1vxw4-uPHyZa32AVZybROOl8-EP6fwAbqHMC2y7nu~set8yBc1uM~UZFdemoBktRNPcn7GTYwp~Ee562ESkW~4N6EMEntHU4wLFAmgsxvhj77fG4xYx36v0lY5UiJAcMjkv27WE~VplK2xS9p5osovJUUC-Eramk8SJ-woPqKAynqR7jJAwJRZRQ2ie-f2TTpAE-QDqIkxLqLp16O~kvKDSwtuqkTvf4px7lJ-KUlvGcLWmyWFHO4U15L14MvsfO-ut5F2KQZRT7LubP0YvQ__',
    email: 'Bella@example.com',
    experience: '8 years',
    fullName: 'Bella',
    gender: GenderEnum.FEMALE,
    isActive: true,
    phoneNumber: '0123987654',
    position: 'Nail Technician',
    rating: 4.9,
    workSchedule: 'Wednesday - Monday, 9 AM - 5 PM'
  },
  {
    _id: 'stylist4',
    avatarUrl: 'https://s3-alpha-sig.figma.com/img/b350/a862/d15d995d96f1c677faaf958feb85d4ae?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oT1lm1jCeuG5r3cga8LtKeeaOHXsRC3k-fbfCyLBj79uhgTRMrOlvocpRB618JfC5oiXqICHAEjct5-vnfXhZeVhvRsQvRdcTW9RHe0CSA~akpk1DNIjKKtOuM6fnAwySKe4hpm8OTrjxsVI-YR1L4RMeFpv0gJy8SIUHFfCNDYw06RoUHWUgASCCuAuuSEeQtdprCZT1mvGjPjanNB-xpB1GjEUcKoINkIVVryazIak4o907F0B0VDHBWbQAJAspQ2Q6KWJhVY0fCyzsFqVHwV6W0fsSNZMantCfVaBJSLd8YBRZMZ2qAa0YUA6McyVAbx6Ecc0UfogxhaxBn47pw__',
    email: 'Joseph@example.com',
    experience: '10 years',
    fullName: 'Joseph',
    gender: GenderEnum.MALE,
    isActive: true,
    phoneNumber: '0213456789',
    position: 'Barber',
    rating: 4.6,
    workSchedule: 'Monday - Friday, 9 AM - 6 PM'
  },
  {
    _id: 'stylist5',
    avatarUrl: 'https://s3-alpha-sig.figma.com/img/e6bd/aeca/ab9d646fe25bd1740e0e15a3524a0f1f?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YmU-AzjJNnLxXMuUmTIGdpBXmcQk1EuON4F6D79BPaWSstXEUaotg1KHXgur23Nxdw~OOJ8ciL-ldNee14brIrmZEMLO~fdAwp67PU1NSZulXtnPDFrcwkD8EKyo5tWhhrtvPO8GZjIFqAEHEonvBLp7jQMjJ32VQQKwqMr6MyqugFwpErQhfGNE3R0tNIja2yqvrdtfQQMBVPKko~EFf-bRxzw1csOD2bA9JPm-npvCCtuzVz~YKIYKr78Oq9Wz6zldkDG5dO6NZ9R7UljPOh5sQjVIMv82oAlNCpd~0OCxzQNVYAi5rwdtNmv1Cl4UUNQMQlEccjr8APoeBcmAEw__',
    email: 'Samantha@example.com',
    experience: '4 years',
    fullName: 'Samantha',
    gender: GenderEnum.FEMALE,
    isActive: true,
    phoneNumber: '0981234567',
    position: 'Esthetician',
    rating: 4.4,
    workSchedule: 'Thursday - Sunday, 11 AM - 7 PM'
  }

]
