import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breed-autocomplete',
  templateUrl: './breed-autocomplete.component.html',
  styleUrls: ['./breed-autocomplete.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class BreedAutocompleteComponent implements OnInit {
  breedControl = new FormControl();
  filteredBreeds!: Observable<string[]>;
  isDisabled: boolean = true;
  @Input() breeds: Set<string> | 'all' = 'all';
  @Output() emittedCat = new EventEmitter<string>();

  ngOnInit(): void {
    this.filteredBreeds = this.breedControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterBreeds(value))
    );
  }

  filterBreeds(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (!this.breeds) {
      return [];
    }

    return Array.from(this.breeds).filter((breed) =>
      breed.toLowerCase().includes(filterValue)
    );
  }

  onBreedSelected(event: any): void {
    const selectedBreed = event.option.value;
    this.emittedCat.emit(selectedBreed);
  }
}
