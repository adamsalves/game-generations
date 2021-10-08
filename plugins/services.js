import createServices from '~/services/Services'

export default (ctx, inject) => {
  inject('services', createServices(ctx.$axios))
}
