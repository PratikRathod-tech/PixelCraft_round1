import React from 'react';
import { useStore } from '../state/StoreContext';
import { X, Trash2, Radio } from 'lucide-react';

export const CargoHoldDrawer: React.FC = () => {
  const {
    isCargoOpen,
    setIsCargoOpen,
    cargo,
    cargoCount,
    cargoTotalGC,
    cargoTotalPayloadKg,
    removeFromCargo,
    setIsManifestModalOpen,
  } = useStore();

  if (!isCargoOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in font-mono text-xs">
      <div className="bg-[#0D1630] border-l-2 border-[#52E5FF]/60 max-w-md w-full h-full flex flex-col justify-between shadow-[0_0_50px_rgba(82,229,255,0.2)] overflow-y-auto animate-slide-left text-[#F1F5FF]">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#26375F] flex items-center justify-between bg-[#070B18]">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-[#52E5FF] tracking-wider">
              INTERSTELLAR CARGO HOLD (BAY 07)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4B2A73] text-[#A8FF60] border border-[#52E5FF]/30">
              {cargoCount} Units
            </span>
          </div>

          <button
            onClick={() => setIsCargoOpen(false)}
            className="p-1.5 rounded-lg text-[#788BB8] hover:text-[#52E5FF] hover:bg-[#0D1630] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cargo Items List */}
        <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto">
          {cargo.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <span className="text-4xl block">🛸</span>
              <span className="font-extrabold text-sm text-[#52E5FF] block">
                Cargo Hold is Empty
              </span>
              <p className="text-xs text-[#788BB8] max-w-xs mx-auto font-sans">
                Sub-space energy canisters, memory seed pods, and anti-grav masala are available in the vault.
              </p>
              <button
                onClick={() => setIsCargoOpen(false)}
                className="mt-3 px-4 py-2 rounded-lg bg-[#52E5FF] text-[#070B18] text-xs font-bold font-mono"
              >
                Inspect Off-World Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                {cargo.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-[#070B18] border border-[#26375F] rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#26375F]"
                      />
                      <div>
                        <span className="font-bold text-[#F1F5FF] block truncate max-w-[150px]">
                          {item.product.name}
                        </span>
                        <span className="text-[10px] text-[#A8FF60] font-mono">
                          {item.product.priceGC} G₵ • {item.product.payloadKg}kg
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#0D1630] border border-[#26375F] text-[#52E5FF] font-bold">
                        Qty: {item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCargo(item.product.id)}
                        className="text-[#A94335] hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Capacity Telemetry & Authorization */}
              <div className="pt-4 border-t border-[#26375F] space-y-3">
                <div className="bg-[#070B18] border border-[#26375F] p-3 rounded-xl space-y-2 text-[11px]">
                  <div className="flex justify-between text-[#788BB8]">
                    <span>Total Payload Mass:</span>
                    <span className="text-[#52E5FF] font-bold">{cargoTotalPayloadKg} kg / 100.0 kg</span>
                  </div>
                  <div className="flex justify-between text-[#788BB8]">
                    <span>Galactic Credits Required:</span>
                    <span className="text-[#A8FF60] font-bold text-sm">{cargoTotalGC} G₵</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCargoOpen(false);
                    setIsManifestModalOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#52E5FF] to-[#A8FF60] text-[#070B18] py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(82,229,255,0.4)]"
                >
                  <Radio className="w-4 h-4" /> Transmit Resupply Manifest to Orion Fleet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
