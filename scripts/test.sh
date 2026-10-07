#!/bin/bash

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_menu() {
  echo ""
  echo -e "${CYAN}========================================${NC}"
  echo -e "${CYAN}       Heatingology E2E Test Runner     ${NC}"
  echo -e "${CYAN}========================================${NC}"
  echo ""
  echo -e "  ${GREEN}1)${NC} All tests"
  echo -e "  ${GREEN}2)${NC} Pages (all pages load with 200)"
  echo -e "  ${GREEN}3)${NC} Navigation (header + footer links)"
  echo -e "  ${GREEN}4)${NC} CTAs (buttons & quote flows)"
  echo -e "  ${GREEN}5)${NC} Links (no broken internal links)"
  echo -e "  ${GREEN}6)${NC} Visual – all viewports"
  echo -e "  ${GREEN}7)${NC} Visual – desktop only"
  echo -e "  ${GREEN}8)${NC} Visual – tablet only"
  echo -e "  ${GREEN}9)${NC} Visual – mobile only"
  echo -e " ${GREEN}10)${NC} Update visual baselines (all)"
  echo -e " ${GREEN}11)${NC} Update visual baselines (mobile only)"
  echo -e " ${GREEN}12)${NC} Performance (Core Web Vitals)"
  echo -e " ${GREEN}13)${NC} Open last HTML report"
  echo -e " ${GREEN}14)${NC} UI mode (interactive)"
  echo ""
  echo -e "  ${RED}q)${NC} Quit"
  echo ""
}

run() {
  echo -e "\n${YELLOW}Running:${NC} $*\n"
  "$@"
}

print_menu
read -rp "Choose an option: " choice

case "$choice" in
  1)  run npx playwright test ;;
  2)  run npx playwright test e2e/pages.spec.ts ;;
  3)  run npx playwright test e2e/navigation.spec.ts ;;
  4)  run npx playwright test e2e/ctas.spec.ts ;;
  5)  run npx playwright test e2e/links.spec.ts ;;
  6)  run npx playwright test e2e/visual.spec.ts ;;
  7)  run npx playwright test e2e/visual.spec.ts --grep "desktop" ;;
  8)  run npx playwright test e2e/visual.spec.ts --grep "tablet" ;;
  9)  run npx playwright test e2e/visual.spec.ts --grep "mobile" ;;
  10) run npx playwright test e2e/visual.spec.ts --update-snapshots ;;
  11) run npx playwright test e2e/visual.spec.ts --grep "mobile" --update-snapshots ;;
  12) run npx playwright test e2e/performance.spec.ts ;;
  13) run npx playwright show-report ;;
  14) run npx playwright test --ui ;;
  q|Q) echo "Bye!" ; exit 0 ;;
  *)  echo -e "${RED}Invalid option.${NC}" ; exit 1 ;;
esac
