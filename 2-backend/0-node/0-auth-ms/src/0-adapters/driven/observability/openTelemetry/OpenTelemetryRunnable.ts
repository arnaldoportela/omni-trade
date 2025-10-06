import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader, ConsoleMetricExporter } from '@opentelemetry/sdk-metrics';

import { Runnable } from '@crosscutting/Runnable';

export class OpenTelemetryRunnable implements Runnable {

    private readonly sdk: NodeSDK;

    constructor() {
        this.sdk = new NodeSDK({
            traceExporter: new ConsoleSpanExporter(),
            metricReader: new PeriodicExportingMetricReader({
                exporter: new ConsoleMetricExporter()
            }),
            instrumentations: [getNodeAutoInstrumentations()]
        });    
    }

    async start(): Promise<void> {
        this.sdk.start();
    }
    async stop(): Promise<void> {
        await this.sdk.shutdown();
    }
}