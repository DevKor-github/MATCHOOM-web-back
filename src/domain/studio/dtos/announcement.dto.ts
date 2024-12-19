import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsString, Length } from "class-validator"

class PostAnnouncement{
    @IsString()
    @Length(1, 30, {message: "제목은 1~30자 이내"})
    @ApiProperty({
        example: "제목제목",
        description: "공지사항 제목"
    })
    title: string

    @IsString()
    @Length(1, 500, {message: "제목은 1~500자 이내"})
    @ApiProperty({
        example: "내용내용",
        description: "공지사항 내용"
    })
    contents: string
}

class GetAnnouncement{
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    contents: string

    @Expose()
    created: Date
}

export { PostAnnouncement, GetAnnouncement }