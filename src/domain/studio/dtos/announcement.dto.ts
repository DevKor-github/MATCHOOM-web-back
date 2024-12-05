import { IsNumber, IsString, Length } from "class-validator"

class PostAnnouncement{
    @IsString()
    @Length(1, 30, {message: "제목은 1~30자 이내"})
    title: string

    @IsString()
    @Length(1, 500, {message: "제목은 1~500자 이내"})
    contents: string
}

export { PostAnnouncement }