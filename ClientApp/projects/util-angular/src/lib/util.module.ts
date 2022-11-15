//================ utilģ�� ======================
//Copyright 2022 ����ϫ
//Licensed under the MIT license
//================================================
import { NgModule } from '@angular/core';
import { TableExtendDirective } from "./zorro/table.extend.directive";
import { EditTableDirective } from "./zorro/edit-table.directive";
import { EditRowDirective } from "./zorro/edit-row.directive";
import { EditControlDirective } from "./zorro/edit-control.directive";
import { ButtonExtendDirective } from "./zorro/button.extend.directive";
import { ValidationExtendDirective } from "./zorro/validation.extend.directive";
import { InputExtendDirective } from "./zorro/input.extend.directive";
import { SelectExtendDirective } from "./zorro/select.extend.directive";
import { TreeTableExtendDirective } from "./zorro/tree.table.extend.directive";
import { TreeExtendDirective } from "./zorro/tree.extend.directive";

/**
 * utilģ��
 */
@NgModule({
    declarations: [
        TableExtendDirective,
        EditTableDirective, EditRowDirective, EditControlDirective,
        ButtonExtendDirective,
        ValidationExtendDirective, InputExtendDirective, SelectExtendDirective,
        TreeTableExtendDirective, TreeExtendDirective
    ],
    imports: [
    ],
    exports: [
        TableExtendDirective,
        EditTableDirective, EditRowDirective, EditControlDirective,
        ButtonExtendDirective,
        ValidationExtendDirective, InputExtendDirective, SelectExtendDirective,
        TreeTableExtendDirective, TreeExtendDirective
    ]
})
export class UtilModule {
}
