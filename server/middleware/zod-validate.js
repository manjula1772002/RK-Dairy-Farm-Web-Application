import {z} from "zod";
//  Reusable middleware 
export default function validateBody(schema){
    return(req,res,next)=>{
        const parsed=schema.safeParse(req.body);
        
       if(!parsed.success){
        const fields=parsed.error.issues.reduce((acc,issue)=>{
            const field=issue.path.join(".")||"from";
            if(!acc[field] ) acc[field]=[];
                acc[field].push(issue.message);
                return acc;
        },{});

        return res.status(400).json({
            error:"validation failed",
            fields,
        });
       } 
       req.validateBody=parsed.data;
       next();
    };
}