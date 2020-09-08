import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../../common/language';
import { SelectedLanguageService } from '../../common/selected-language.service';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {
  languages: Language[] = [];

  constructor(private route: ActivatedRoute, private selectedLanguageService: SelectedLanguageService) {
    this.languages = this.selectedLanguageService.getKnownLanguages();
  }

  ngOnInit(): void {
  }

  get selectedLanguage(): Language {
    return this.selectedLanguageService.getSelectedLanguage();
  }

  onLanguageChange(event: any) {
    this.selectedLanguageService.selectLanguageByCode(event.target.value);
  }
}
