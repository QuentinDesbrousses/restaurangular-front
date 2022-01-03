import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CategorieAllergene} from "../../../models/categorie-allergene";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmationFormComponent} from "../../forms/confirmation-form/confirmation-form.component";
import {CategorieIngredient} from "../../../models/categorie-ingredient";
import {CategorieIngredientFormComponent} from "../../forms/categorie-ingredient-form/categorie-ingredient-form.component";

@Component({
  selector: 'app-categorie-ingredient-list',
  templateUrl: './categorie-ingredient-list.component.html',
  styleUrls: ['./categorie-ingredient-list.component.css']
})
export class CategorieIngredientListComponent implements OnInit, AfterViewInit {

  @Input() categories_ingredient : CategorieIngredient[] | undefined;
  dataSource = new MatTableDataSource<CategorieIngredient>();
  displayedColumns = ['ID','nom','modifier','supprimer'];

  @ViewChild(MatPaginator) paginator : MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private _liveAnnouncer: LiveAnnouncer, private dialog : MatDialog) { }

  ngOnInit(): void {
    if(this.categories_ingredient){
      this.dataSource = new MatTableDataSource<CategorieIngredient>(this.categories_ingredient);
    }
  }

  ngAfterViewInit() {
    if (this.paginator){
      this.dataSource.paginator = this.paginator;
    }
    if(this.sort){
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //CRUD Allergene
  creerCategorieIngredient(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = {type: "creation"}
    this.dialog.open(CategorieIngredientFormComponent,dialogConfig);
    console.log("création catégorie ingrédient");
  }
  modifierCategorieIngredient(id:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = {type: "modification",id:id}
    this.dialog.open(CategorieIngredientFormComponent,dialogConfig);
    console.log("Catégorie d'ingrédient n° "+id+" modifié");
  }
  supprimerCategorieIngredient(id:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = {id: id,type:"categorie-ingredient"};
    this.dialog.open(ConfirmationFormComponent,dialogConfig);
    console.log("Catégorie d'ingrédient n° "+id+" supprimé");
  }
}