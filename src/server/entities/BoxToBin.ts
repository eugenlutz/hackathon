import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { Box } from "./box";
import { Bin } from "./Bin";

@Entity()
export class BoxToBin {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    id: number;

    @OneToOne(() => Box, (box) => box.id) // specify inverse side as a second parameter
    box_id: number;

    @OneToMany(() => Bin, (bin) => bin.id)
    bin_id: number;
}