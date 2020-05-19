export class Order {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id: string;
    offers: string[];
    status: string;
    attempts: number;
    notes: any[];
    created_at: number;
}