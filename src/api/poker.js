import request from '@/utils/request'

export function simulatePoker(data) {
  return request({
    url: '/api/poker/simulate',
    method: 'post',
    data
  })
}
