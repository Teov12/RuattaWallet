<script lang="ts" setup>
    import {useTransactionStore} from "../../../stores/transaction.store"
    const {transaction, transactions, getTransactionRead} = useTransactionStore();
</script>

<template>
    <div class="card" >
        <div class="card-body">
            <div>
                xd
                <div>
                    xd:{{transaction.money}}
                </div>
                <div>
                    {{ transaction.crypto_amount }}
                </div>
                <div>
                    {{ transaction.crypto_code }}
                </div>  
                <div>
                    {{ transaction.time }}
                </div>
                <div>
                    {{ transaction.action }}
                </div>
            </div>
        </div>
</div>

</template>