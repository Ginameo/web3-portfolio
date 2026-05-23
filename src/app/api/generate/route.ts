import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { githubUsername, targetProject, skills } = await req.json();
    const skillStr = Array.isArray(skills) ? skills.join(', ') : skills;

    return NextResponse.json({
      success: true,
      data: {
        name: githubUsername,
        avatar: `https://github.com/${githubUsername}.png`,
        bio: `Web3 contributor focused on the ${targetProject} ecosystem. Core skills: ${skillStr}. Actively building on-chain tools and educational content.`,
        pitch: `I aim to contribute to ${targetProject} through:\n\n• Smart contract development & auditing\n• dApp frontend engineering (Next.js/Vue/React)\n• Technical documentation & tutorials\n• Workflow automation for contributor onboarding\n\nMy GitHub shows consistent, production-ready builds for Web3.`,
        repos: [
          { name: 'erc20-minter', desc: 'ERC20 token deployment contract', lang: 'Solidity', stars: 12 },
          { name: 'nft-collector', desc: 'NFT minting & tracking dashboard', lang: 'TypeScript', stars: 8 },
          { name: 'defi-dashboard', desc: 'Liquidity pool monitoring tool', lang: 'Vue.js', stars: 15 },
        ]
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}