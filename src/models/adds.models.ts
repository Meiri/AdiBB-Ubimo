import { IAdEvent } from 'ubimo-ad-dispatcher';

export interface ExtendIAdEvent extends IAdEvent {
  isActive?: boolean;
  time?: number;
}
