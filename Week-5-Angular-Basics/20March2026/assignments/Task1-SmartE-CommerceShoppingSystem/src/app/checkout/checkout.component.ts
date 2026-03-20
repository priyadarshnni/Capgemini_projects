import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  submitted = false;
  orderPlaced = signal(false);

  cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
  states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Telangana', 'Gujarat'];

  constructor(private fb: FormBuilder, public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      deliveryType: ['standard', Validators.required],
      paymentMethod: ['cod', Validators.required],
      cardNumber: [''],
      cardExpiry: [''],
      cardCvv: [''],
      upiId: [''],
      acceptTerms: [false, Validators.requiredTrue],
    });

    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.updatePaymentValidators(method);
    });
  }

  get f(): Record<string, AbstractControl> { return this.checkoutForm.controls; }
  get paymentMethod(): string { return this.checkoutForm.get('paymentMethod')?.value; }

  updatePaymentValidators(method: string): void {
    const cardFields = ['cardNumber', 'cardExpiry', 'cardCvv'];
    if (method === 'credit' || method === 'debit') {
      this.checkoutForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern('^\\d{16}$')]);
      this.checkoutForm.get('cardExpiry')?.setValidators([Validators.required]);
      this.checkoutForm.get('cardCvv')?.setValidators([Validators.required, Validators.pattern('^\\d{3,4}$')]);
      this.checkoutForm.get('upiId')?.clearValidators();
    } else if (method === 'upi') {
      this.checkoutForm.get('upiId')?.setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9.\\-_]+@[a-zA-Z]+$')]);
      cardFields.forEach(f => this.checkoutForm.get(f)?.clearValidators());
    } else {
      [...cardFields, 'upiId'].forEach(f => this.checkoutForm.get(f)?.clearValidators());
    }
    [...cardFields, 'upiId'].forEach(f => this.checkoutForm.get(f)?.updateValueAndValidity());
  }

  isInvalid(field: string): boolean {
    const ctrl = this.checkoutForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched || this.submitted));
  }

  getError(field: string): string {
    const ctrl = this.checkoutForm.get(field);
    if (!ctrl || !ctrl.errors) return '';
    if (ctrl.errors['required']) return 'This field is required.';
    if (ctrl.errors['email']) return 'Enter a valid email address.';
    if (ctrl.errors['minlength']) return `Minimum ${ctrl.errors['minlength'].requiredLength} characters required.`;
    if (ctrl.errors['pattern']) {
      if (field === 'phone') return 'Enter a valid 10-digit mobile number.';
      if (field === 'zipCode') return 'Enter a valid 6-digit PIN code.';
      if (field === 'cardNumber') return 'Card number must be 16 digits.';
      if (field === 'cardCvv') return 'CVV must be 3 or 4 digits.';
      if (field === 'upiId') return 'Enter a valid UPI ID (e.g. name@upi).';
      return 'Invalid format.';
    }
    if (ctrl.errors['requiredTrue']) return 'You must accept the terms and conditions.';
    return '';
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.orderPlaced.set(true);
    this.cartService.clearCart();
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
