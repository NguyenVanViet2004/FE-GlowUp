import { GenderEnum } from '~/interfaces/enum/Gender'
import { Rank } from '~/interfaces/enum/Rank'
import { Role } from '~/interfaces/enum/Role'
import type User from '~/interfaces/User'

const dataUsers: User[] = [
  {
    _id: 'user1',
    address: '123 Main St, City, Country',
    avatarUrl: 'https://s3-alpha-sig.figma.com/img/4af1/a18a/a15ec02a62e7b8519dbeb11ee25bc152?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EVIglapyI-n5rT0lul-ddA0Jua1bMfC9GNGRMOAqyOlBbKpwowkJNmXD4qhUeJfO2Qpdi3A-U3BkoHe59QYp7rA8I2abd5gy05QLxHknCWhdECUeG8uSE-fTLbNcZ6svcp8-6OO4IFEYEa-jKzbQLdk4Lj1nBcvq-reXE92fRZbCWwtEmhMu6G2ix4QPNLpSMiw6ZxSD7UdS-o5~opYTzqFTiJNbRi0NNhRNENKDJlZKIezTLlUmj1kbcz8kDby4~oTCfOuVtwVfYLbSon2Oa~Nk8TuNs~DpiqdQae9wjxM6zoyZAIXG2ZFqN3BOayOy9X97Qr6OxCGKxU-uDuV~qw__',
    dateOfBirth: new Date('1990-01-01'),
    email: 'john@example.com',
    fullName: 'Jennie Whang',
    gender: GenderEnum.MALE,
    membership: {
      name: Rank.BRONZE,
      point: 100
    },
    password: 'password123',
    phoneNumber: '0123456789',
    point: 100,
    role: Role.USER,
    token: 'token123'
  },
  {
    _id: 'user2',
    address: '456 Elm St, City, Country',
    avatarUrl: 'https://s3-alpha-sig.figma.com/img/5dfa/a296/b9f2db5ec72e31b1515257953a76eb2e?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HTQLMk0OakRVQiSlIYFm4GlPgAZVYplLXdueOktIG5iQxB2GLYg7132EwI3KJWdwyDpdPDjZwOhhvnIYUgcXhddcvr8lRb0L2mYY2fE8KOlkfh8aEtfr0Hyob46TF4DyiJdgROrcDNcQSe2hC7KCD2zAB6C19Gjeb2tBEvjNIQ-FWuP3ILLZmLxJRcPn3GrnsBLFYaWVXAEurHQX4ShvN0FGuyTQpI-79occU8qn6WZjMeiSw3Qydhkrfx1CpJ3Ap-hKRiVbZc~ZuyysRYgqEkkhYMM0FhDOqty-Ik8GhEw2ssFZ65M8cxlD7bDlXEvO3BDEVDiFslydkWD3QTu0tQ__',
    dateOfBirth: new Date('1995-05-05'),
    email: 'jane@example.com',
    fullName: 'Nathalie',
    gender: GenderEnum.FEMALE,
    membership: {
      name: Rank.SILVER,
      point: 250
    },
    password: 'password123',
    phoneNumber: '0123456780',
    point: 150,
    role: Role.USER,
    token: 'token456'
  },
  {
    _id: 'user3',
    address: '789 Oak St, City, Country',
    avatarUrl: 'https://s3-alpha-sig.figma.com/img/6a7f/debf/89a7bb2a7edfbef052ef27f61bcad084?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i8OXrMVv3JfRNYcneWhFd4lA2ZOvpQEjnIka1GgAwf6GBLSoMaKjCWe0uCRexUPU3FW6eGSyvJkmd6ww6CEIPLzN7nLBdpgiVA025YEWBPHDNooObL3mfs5aAIRnwdiSvt04aGmAH9hKxKXQx91o02bf3tYDsrKaEMwIMFBAOzq~RQuKhP9MPmf5NFAAJniyRcXopqZ5zW6jyFHZbXg-2EgQLVaEyprDS5WjCKsW4OWOpO~cnhJd-WPduS~Uocb0cHANMMi0hnZRpJqpKf7MKsmxC1Soz0VfKIK-E95Ab1kQiqmbt1rDNfavJD6dTRNPJa6bNsFwyhiB52ZFq29yjg__',
    dateOfBirth: new Date('1988-03-15'),
    email: 'alice@example.com',
    fullName: 'Julia Martha',
    gender: GenderEnum.FEMALE,
    membership: {
      name: Rank.GOLD,
      point: 500
    },
    password: 'password123',
    phoneNumber: '0123456790',
    point: 80,
    role: Role.USER,
    token: 'token789'
  }
]

export default dataUsers
