import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bin {

    @PrimaryGeneratedColumn({
        type: "int"
    })
    id: number;

    @Column({
        type: "int",
        unique: true,
        nullable: false
    })
    number: number;

    @Column({
        type: "int",        
        nullable: false,
        default: 1,
    })
    capa: number;

}