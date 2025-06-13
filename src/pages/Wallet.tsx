import { useState } from 'react'
import * as bip39 from 'bip39'
import { HDNodeWallet, Wallet } from 'ethers'
import { Keypair } from '@solana/web3.js'
import { derivePath } from 'ed25519-hd-key'
import { Copy, RefreshCw, Key, Wallet as WalletIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'

const ETH_DERIVATION_PATH = "m/44'/60'/0'/0/0"
const SOL_DERIVATION_PATH = "m/44'/501'/0'/0'"

export function WalletGenerator() {
  const [mnemonic, setMnemonic] = useState('')
  const [password, setPassword] = useState('')
  const [usePassword, setUsePassword] = useState(false)
  const [ethWallet, setEthWallet] = useState<HDNodeWallet | null>(null)
  const [solWallet, setSolWallet] = useState<Keypair | null>(null)

  const generateMnemonic = () => {
    const newMnemonic = bip39.generateMnemonic(256)
    setMnemonic(newMnemonic)
    generateWallets(newMnemonic, password)
  }

  const generateWallets = (mnemonicPhrase: string, passphrase: string) => {
    try {
      // Generate Ethereum wallet
      const ethNode = HDNodeWallet.fromPhrase(
        mnemonicPhrase,
        passphrase,
        ETH_DERIVATION_PATH
      )
      setEthWallet(ethNode)

      // Generate Solana wallet
      const seed = bip39.mnemonicToSeedSync(mnemonicPhrase, passphrase)
      const derivedSeed = derivePath(SOL_DERIVATION_PATH, seed.toString('hex')).key
      const solKeypair = Keypair.fromSeed(derivedSeed.slice(0, 32))
      setSolWallet(solKeypair)
    } catch (error) {
      toast({
        title: 'Error generating wallets',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mnemonic) {
      toast({
        title: 'Mnemonic required',
        description: 'Please generate or enter a mnemonic phrase',
        variant: 'destructive',
      })
      return
    }
    generateWallets(mnemonic, usePassword ? password : '')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied to clipboard',
      duration: 2000,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Web3 HD Wallet Generator</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate HD Wallet</CardTitle>
          <CardDescription>
            Create a hierarchical deterministic wallet that works with Ethereum and Solana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mnemonic">Mnemonic Phrase</Label>
              <div className="flex gap-2">
                <Input
                  id="mnemonic"
                  value={mnemonic}
                  onChange={(e) => setMnemonic(e.target.value)}
                  placeholder="Generate or enter a 12/24 word mnemonic"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateMnemonic}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="use-password"
                checked={usePassword}
                onCheckedChange={setUsePassword}
              />
              <Label htmlFor="use-password">Use passphrase (optional)</Label>
            </div>

            {usePassword && (
              <div className="space-y-2">
                <Label htmlFor="password">Passphrase</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Optional passphrase for extra security"
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              Generate Wallets
            </Button>
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="ethereum" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
          <TabsTrigger value="solana">Solana</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ethereum">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-6 w-6" />
                Ethereum Wallet
              </CardTitle>
              <CardDescription>
                Derived from mnemonic using path: {ETH_DERIVATION_PATH}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ethWallet ? (
                <>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <div className="flex items-center gap-2">
                      <Input value={ethWallet.address} readOnly />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(ethWallet.address)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy address</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Public Key</Label>
                    <div className="flex items-center gap-2">
                      <Input value={ethWallet.publicKey} readOnly />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(ethWallet.publicKey)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy public key</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Private Key</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="password"
                        value={ethWallet.privateKey}
                        readOnly
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(ethWallet.privateKey)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy private key</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Generate a wallet to see the details
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solana">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-6 w-6" />
                Solana Wallet
              </CardTitle>
              <CardDescription>
                Derived from mnemonic using path: {SOL_DERIVATION_PATH}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {solWallet ? (
                <>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <div className="flex items-center gap-2">
                      <Input value={solWallet.publicKey.toString()} readOnly />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(solWallet.publicKey.toString())}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy address</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Public Key</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={solWallet.publicKey.toString()}
                        readOnly
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              copyToClipboard(solWallet.publicKey.toString())
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy public key</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Private Key</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="password"
                        value={Buffer.from(solWallet.secretKey).toString('hex')}
                        readOnly
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              copyToClipboard(
                                Buffer.from(solWallet.secretKey).toString('hex')
                              )
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy private key</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Generate a wallet to see the details
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-sm text-muted-foreground">
        <p className="font-medium">Security Note:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Never share your mnemonic phrase or private keys</li>
          <li>This tool runs entirely in your browser - nothing is sent to servers</li>
          <li>For production use, consider more secure key management solutions</li>
        </ul>
      </div>
    </div>
  )
}


export default Wallet;