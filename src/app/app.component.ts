import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DesmosService } from './Services/desmos.service';
declare var Desmos: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'desmoss';
  @ViewChild('desmosContainer') desmosContainer!: ElementRef;
  @ViewChild('fourfunctioncalculator')
  fourfunctioncalculatorContainer!: ElementRef;
  @ViewChild('scientificcalculator') scientificcCalculator!: ElementRef;
  calculator: any;
  calculator1: any;
  calculator2: any;

  tabsArray: any[] = [
    { tabName: 'Basic Details', isEnabled: true },
    { tabName: 'Project Details', isEnabled: false },
    { tabName: 'Family Details', isEnabled: true },
  ];

  activeTab: string = 'Basic';
  active = 1;
  dispplayRes: any;
  constructor(private desmosLoaderService: DesmosService) {}

  // loadDesmosLibrary(callback: () => void) {
  //   const script = document.createElement('script');
  //   script.src =
  //     'https://www.desmos.com/api/v1.6/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
  //   script.onload = () => {
  //     callback();
  //   };
  //   document.body.appendChild(script);
  // }

  ngAfterViewInit(): void {

    this.desmosLoaderService.loadDesmosLibrary(() => {
      this.initializeCalculator();
    });
    console.log(this.desmosContainer);

  }
  ngOnInit(): void {}

  activeIdChange(activeTabId: any) {
    console.log(activeTabId);
    switch (activeTabId) {
      case 1:
        setTimeout(() => {
          // Initialize calculator after view is fully initialized
          this.initializeCalculator();
        });
        // code block
        break;
      case 2:
        setTimeout(() => {
          // Initialize calculator after view is fully initialized
          // this.initializeCalculator();
          this.setFourFunctionCalculatorTab();
        });
        // code block
        break;
      case 3:
        setTimeout(() => {
          this.setScientificCalculatorTab();
        });
        // code block
        break;
      default:
      // code block
    }
  }
  setSelectedTab(tab: any) {
    console.log(tab);

    if (tab.isEnabled) {
      this.activeTab = tab.tabName;
    }
  }
  setFourFunctionCalculatorTab() {
    this.calculator1 = Desmos.FourFunctionCalculator(
      this.fourfunctioncalculatorContainer.nativeElement
    );
  }
  setScientificCalculatorTab() {
    if (this.scientificcCalculator) {
      this.calculator2 = Desmos.ScientificCalculator(
        this.scientificcCalculator.nativeElement
      );
    }
  }

  initializeCalculator() {
    
    this.calculator = Desmos.GraphingCalculator(
      this.desmosContainer.nativeElement
    );

    //     var elt1 = document.getElementById('four-function-calculator');
    // this.calculator = Desmos.FourFunctionCalculator(this.fourfunctioncalculatorContainer);

    // var elt2 = document.getElementById('scientific-calculator');
    // var calculator2 = Desmos.ScientificCalculator(elt2);
    // Customize and use the calculator as needed
    this.calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
    this.calculator.setExpression({ id: 'graph2', latex: 'y=x^3' });
    this.calculator.setExpression({ id: 'graph3', latex: 'y=x^56 ' });
    this.calculator.setExpression({
      type: 'table',
      columns: [
        {
          latex: 'x',
          values: ['1', '2', '3', '4', '5'],
        },
        {
          latex: 'y',
          values: ['1', '4', '9', '16', '25'],
          dragMode: Desmos.DragModes.XY,
        },
        {
          latex: 'x^2',
          color: Desmos.Colors.BLUE,
          columnMode: Desmos.ColumnModes.LINES,
        },
      ],
    });
  }

  OnSave() {
    let result = this.calculator.getState();
    this.dispplayRes = result.expressions.list;
    console.log(result);
  }
}
