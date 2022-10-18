import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task';
import {schema, rules} from '@ioc:Adonis/Core/Validator';

export default class TasksController {
    public async index({view,auth}:HttpContextContract){
        const user = auth.user
        await user?.preload('task')

        // const tasks = await Task.all();
        return view.render('tasks/index',{tasks: user?.task})
    }

    public async store({request, response, session, auth}:HttpContextContract){
        const validationSchema = schema.create({
            title: schema.string({trim:true},[
                rules.maxLength(255),
                rules.minLength(5)
            ]),
            
        })

       const validatedData = await request.validate({ 
            schema:validationSchema,
            messages:{
                'title.required': 'Enter task title',
                'title.maxLength': 'Task title can not exceed 255 character',
                'title.minLength': 'Task title can not less 5 character',
            },
        })

        
        await auth.user?.related('task').create({
            title: validatedData.title,
        })

        session.flash('notification', 'Task added successfully')

        return response.redirect('back')
    }
    public async update({request, response , session, params}:HttpContextContract){
        const task = await Task.findOrFail(params.id)

        task.isCompleted= !!request.input('completed')
        await task.save()

        session.flash('notification', 'Task updated!')

        return response.redirect('back');
    }
    public async destroy({ response , session, params}:HttpContextContract){
        const task = await Task.findOrFail(params.id)

        await task.delete()

        session.flash('notification', 'Task Deleted!')

        return response.redirect('back');
    }


}
 