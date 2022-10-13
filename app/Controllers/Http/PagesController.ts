import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
    public home ({view} : HttpContextContract){
        return view.render('welcome')
    }
    public about ({params}) {
      return  params.name ? `The name of product is ${params.name}`:'this is about page';
    }
}
