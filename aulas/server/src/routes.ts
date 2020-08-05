import express from 'express';
import db from './database/connection';
import convertTimeToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

routes.post('/classes', async (req, res) => {
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

})

export default routes;