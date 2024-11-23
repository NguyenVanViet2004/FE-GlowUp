import type Review from '~/interfaces/Review'

export const dataReviews: Review[] = [
  {
    _id: 'review1',
    appointmentId: 'appointment1',
    comment: 'The place was clean, great serivce, stall' +
    ' are friendly. I will certainly recommend to my' +
    ' friends and visit again! ;)',
    createdAt: new Date().toISOString(),
    image: null,
    rating: 5,
    stylistId: 'stylist1',
    updatedAt: null,
    userId: 'user1'
  },
  {
    _id: 'review2',
    appointmentId: 'appointment1',
    comment: 'Very nice service from the specialist.' +
    ' I always going here for my treatment.',
    createdAt: new Date().toISOString(),
    image: null,
    rating: 4,
    stylistId: 'stylist2',
    updatedAt: null,
    userId: 'user2'
  },
  {
    _id: 'review3',
    appointmentId: 'appointment2',
    comment: 'This is my favourite place to treat my hair :)',
    createdAt: new Date().toISOString(),
    image: null,
    rating: 3,
    stylistId: 'stylist3',
    updatedAt: null,
    userId: 'user3'
  }
]
