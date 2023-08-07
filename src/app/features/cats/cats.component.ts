import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreedAutocompleteComponent } from './components/breed-autocomplete/breed-autocomplete.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GetAllBreedsService } from './services/get-all-breeds.service';
import { CatPictureComponent } from './components/cat-picture/cat-picture.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { ImageComponent } from '../../shared/components/image/image.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ICat } from './models/cat.interface';

@Component({
  selector: 'app-cats',
  standalone: true,
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreedAutocompleteComponent,
    MatProgressBarModule,
    ReactiveFormsModule,
    CatPictureComponent,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    CommonModule,
    FormsModule,
  ],
})
export class CatsComponent implements OnInit, OnDestroy {
  @ViewChild(BreedAutocompleteComponent)
  breedAutocompleteComponent!: BreedAutocompleteComponent;
  showAdditionalMessage$ = new BehaviorSubject(false);
  showReloadMessage$ = new BehaviorSubject(false);
  selectedBreed: ICat[] = [];
  howManyToShow = 10;
  uniqueBreeds: Set<string> = new Set();
  catsToRender: ICat[] | null = null;
  imgToRender: string[] = [];
  onDestroy$ = new Subject<void>();
  isLoading = true;
  allCats: ICat[] = [];
  catForm!: FormGroup;

  private _getAllBreedsService = inject(GetAllBreedsService);
  private _dialog = inject(MatDialog);
  private _cdk = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.catForm = new FormGroup({});
    this._getAllBreedsService
      .getAllBreeds()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          this.allCats = data;
          this.allCats?.map((cat) => this.uniqueBreeds.add(cat.breeds[0].name));
          this.isLoading = false;
          this.breedAutocompleteComponent.isDisabled = false;
          this._cdk.markForCheck();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.showReloadMessage$.next(true);
        },
      });
    setTimeout(() => {
      this.showAdditionalMessage$.next(true);
    }, 8000);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  chosenCat(data?: string) {
    if (!data) {
      this.catsToRender = this.allCats;
      this.imgToRender = this.catsToRender.map((cat) => cat.url);
      this._cdk.markForCheck();
    } else {
      this.catsToRender = this.allCats.filter(
        (cat) => cat.breeds[0].name === data
      );
      this.imgToRender = this.catsToRender.map((cat) => cat.url);
    }
  }

  showModal(url: string): void {
    const dialogRef = this._dialog.open(ImageComponent);
    const imageComponentInstance =
      dialogRef.componentInstance as ImageComponent;
    imageComponentInstance.url = url;
  }
}
