import { Component } from '@angular/core'
import { AdminService } from '../../services/admin.service'
import { NzMessageService } from 'ng-zorro-antd/message'
import { Router } from '@angular/router'

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {
  cars: any[] = []
  constructor(
    private adminService: AdminService,
    private message: NzMessageService,   private router: Router
  ) {}

  bookings: any[] = []
  isSpinning = false

  ngOnInit() {
    this.getBookings()
  
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.adminService.changeBookingStatus(bookingId, status).subscribe(
      () => {
        this.getBookings()

        this.message.success('Booking status changed successfully')
      },
      error => {
        this.message.error('Error changing booking status')
      }
    )
  }

  private getBookings() {
    this.isSpinning = true

    this.adminService.getCarBookings().subscribe(bookings => {
      this.bookings = bookings

      this.isSpinning = false
    })
  }
  

}
