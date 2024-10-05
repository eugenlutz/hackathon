import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BoxToBin {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    id: number;

    @Column({
        type: "int",
        unique: true,
        nullable: false
    })
    box_id: number;

    @Column({
        type: "int",        
        nullable: false,
    })
    bin_id: number;
}