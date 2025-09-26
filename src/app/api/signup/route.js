import {dbConnect} from "../../../lib/db"
import User from "../../../models/User"
import bcrypt from "bcryptjs"
import s3 from "../../../lib/s3"

export const config = {
  api: {
    bodyParser: false, // disable bodyParser so we can use formData
  },
};

export async function POST(req){
    try{
        await dbConnect();
        const formData = await req.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const file = formData.get("profilePic");

        if (password !== confirmPassword) {
        return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400 });
        }
        const user = await User.findOne({email});
        if(user)
        {
            return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePicUrl = "";
        if(file)
        {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const params = {
                Bucket: process.env.S3_BUCKET,
                Key: `profile-pics/${Date.now()}_${file.name}`,
                Body: buffer,
                ContentType: file.type,
                // ACL: "public-read",
            };

            const uploaded = await s3.upload(params).promise();
            profilePicUrl = uploaded.Location;
        }

        const newUser = await User.create({
            name,
            email,
            password : hashedPassword,
            profilePic : profilePicUrl
        })

        const {password : _, ...newUserWithoutPassword} = newUser.toObject();
        return new Response(JSON.stringify(newUserWithoutPassword), {status : 201});

    }catch(err)
    {
        console.log("Internal Server Error", err);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}