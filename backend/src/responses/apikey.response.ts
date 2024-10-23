import ApiResponse from '@/interfaces/api-service.interface';
import { IsString } from 'class-validator';


export class ApiKeyApiResponse  implements ApiResponse<string> {
    @IsString()
    data: string;
    @IsString()
    message: string;
}
