import { Contract, ContractProvider, Sender, Address, Cell, beginCell } from 'ton-core';
import { Buffer } from 'buffer';

export class EventManagerContract implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createForDeploy(code: Cell, initialData: Cell): EventManagerContract {
        return new EventManagerContract(Address.parseRaw('0:0'), { code, data: initialData });
    }

    async sendVerifyIdentity(provider: ContractProvider, via: Sender, identityData: Cell) {
        await provider.internal(via, {
            value: '0.01', // 0.01 TON for gas
            body: beginCell()
                .storeUint(1, 32) // op: verify_identity
                .storeRef(identityData)
                .endCell(),
        });
    }

    async sendCreateEvent(
        provider: ContractProvider,
        via: Sender,
        params: {
            eventId: string;
            startTime: number;
            endTime: number;
            maxParticipants: number;
            ticketPrice: bigint;
            metadata: Cell;
        }
    ) {
        await provider.internal(via, {
            value: '0.02', // 0.02 TON for gas
            body: beginCell()
                .storeUint(2, 32) // op: create_event
                .storeAddress(Address.parse(params.eventId))
                .storeUint(params.startTime, 64)
                .storeUint(params.endTime, 64)
                .storeUint(params.maxParticipants, 16)
                .storeCoins(params.ticketPrice)
                .storeRef(params.metadata)
                .endCell(),
        });
    }

    async sendMintCertificate(
        provider: ContractProvider,
        via: Sender,
        params: {
            recipient: string;
            eventId: string;
            achievementData: Cell;
        }
    ) {
        await provider.internal(via, {
            value: '0.02', // 0.02 TON for gas
            body: beginCell()
                .storeUint(3, 32) // op: mint_certificate
                .storeAddress(Address.parse(params.recipient))
                .storeAddress(Address.parse(params.eventId))
                .storeRef(params.achievementData)
                .endCell(),
        });
    }
}