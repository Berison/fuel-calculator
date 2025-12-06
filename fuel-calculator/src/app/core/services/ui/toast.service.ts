import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

type ToastPosition = 'top' | 'middle' | 'bottom';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastController = inject(ToastController);

  /**
   * Basic method of displaying toast
   */
  async show(
    message: string,
    options?: {
      color?: string;
      duration?: number;
      position?: ToastPosition;
      icon?: string;
    }
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: options?.duration ?? 2000,
      position: options?.position ?? 'bottom',
      color: options?.color ?? 'dark',
      icon: options?.icon,
    });

    await toast.present();
  }

  /** Successful message */
  success(message: string, duration = 2000) {
    return this.show(message, {
      color: 'success',
      duration,
      icon: 'checkmark-circle',
    });
  }

  /** Error */
  error(message: string, duration = 2500) {
    return this.show(message, {
      color: 'danger',
      duration,
      icon: 'alert-circle',
    });
  }

  /** Information */
  info(message: string, duration = 2000) {
    return this.show(message, {
      color: 'primary',
      duration,
      icon: 'information-circle',
    });
  }
}
