import { Component, OnInit } from "@angular/core";
import { PaymentService } from "../payment.service";
import { Product } from "../app.classLibrary";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  errorMessage: string;
  productList: Product[];
  selectedProduct: Product;
  montlyPayment: number;
  constructor(private paymentService: PaymentService) {
    this.productList = [];
    this.selectedProduct = new Product();
  }

  ngOnInit() {
    this.getProductList("all");
  }

  getProductList(filter: string) {
    this.paymentService.getProductList(filter)
      // .do(data => console.dir(data))
      .subscribe(
        data => {
          console.dir(data)
          this.productList = data;
        },
      error => {
        console.log("could not get products", error);
      }
      );
  }

  public onProductListChange(item: any) {
    // console.log("In onProductListChange: " + item);
    this.selectedProduct = item;
    this.montlyPayment = item.price / 12;
  }
}
