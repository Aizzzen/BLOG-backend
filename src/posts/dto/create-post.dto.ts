import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example: 'Список просмотренных аниме', description: 'Заголовок'})
    readonly title: string;
    @ApiProperty({example: 'Что вершит судьбу человечества в этом мире? Некое незримое существо или закон, подобно Длани Господней парящей над миром?', description: 'Текст поста'})
    readonly content: string;
    @ApiProperty({example: '35', description: 'Уникальный идентификатор автора поста'})
    readonly userId: number;
}
