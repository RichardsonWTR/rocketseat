import  {Request, Response} from 'express'
import db from "../database/connection";
import convertTimeToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassController {

     async  Create (req : Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
        
        const transaction = await db.transaction();
    
        try{
            const insertedUserIds = await transaction('users').insert({
                name,avatar,whatsapp,bio
            })
            
           const insertedClassesIds = await transaction('classes').insert({
                subject,cost,user_id :insertedUserIds[0]
            })
        
            const class_id  =  insertedClassesIds[0];
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertTimeToMinutes(scheduleItem.from),
                    to: convertTimeToMinutes(scheduleItem.to),
                    class_id
                }
            })
            await transaction('class_schedule').insert(classSchedule);
        
          await transaction.commit();
            
            return res.status(201).send();
        }
        catch{
            await transaction.rollback();
            return res.status(500).json({
                error: 'Unexpected error while creating new class'
            });
        }
    
    }

    async Index(req: Request, res : Response){
        const filters = req.query;

        if(!filters.subject || !filters.week_day || !filters.time){
            return res.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const subject  = filters.subject as string;
        const time = filters.time as string;
        const week_day = filters.week_day as string;

        const timeInMinutes = convertTimeToMinutes(time);
        
        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??',[Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??',[timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??',[timeInMinutes])
            })
            .join('users','users.id','=','classes.user_id')
            .where('classes.subject','=',subject)
            .select(['classes.*','users.*'])
        return res.json(classes);


    }
}