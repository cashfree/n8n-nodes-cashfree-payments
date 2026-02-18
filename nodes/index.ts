import { CashfreePayments } from './CashfreePayments/CashfreePayments.node';
import { CashfreePaymentGatewayApi } from '../credentials/CashfreePaymentGatewayApi.credentials';
import { CashfreePayoutApi } from '../credentials/CashfreePayoutApi.credentials';

export const nodes = [CashfreePayments];
export const credentials = [CashfreePaymentGatewayApi, CashfreePayoutApi];
