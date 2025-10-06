import { Injectable, signal, computed } from '@angular/core';
import { LoggedInUser } from '../models/logged-in-user.model';

@Injectable({ providedIn: 'root' })
export class LoggedInUserService {
  private user = signal<LoggedInUser | null>({
    id: 'user-001',
    firstName: 'Suhaib',
    lastName: 'JANJUA',
    email: 'suhaib.janjua@gmail.com',
    phone: '+1 (555) 123-4567',
    role: 'admin',
    avatar: ''
  });

  readonly fullName = computed(() => {
    const u = this.user();
    return u ? `${u.firstName} ${u.lastName}` : '';
  });

  readonly image = computed(() => this.user()?.avatar ?? '');
  readonly role = computed(() => this.user()?.role ?? 'guest');
  readonly email = computed(() => this.user()?.email ?? '');
  readonly phone = computed(() => this.user()?.phone ?? '');

  // ✅ Set or update user
  setUser(user: LoggedInUser) {
    this.user.set(user);
  }

  updateUser(partial: Partial<LoggedInUser>) {
    this.user.update(u => u ? { ...u, ...partial } : u);
  }

  clearUser() {
    this.user.set(null);
  }

  get snapshot(): LoggedInUser | null {
    return this.user();
  }
}
